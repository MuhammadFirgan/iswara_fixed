'use server'

import { Model, paramsForAudio } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { formatTime, generateSlug, getDuration } from "../utils"
import User from "../database/models/user.model"
import {  queryTtsResult, saveAudioToUT, submitItsRequest } from "../helpers/audio"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"
import CreateAudio from "../database/models/createAudio.model"
import redis from "../redis"
import { prosaApiKey } from "@/constans"
import Speech from "../database/models/speech.model"
import { getCachedOrDB, revalidateCache } from "../cache"
import { getToken } from "@/constans/getToken"

const TTL = 3600

export async function getAudios(query?: string, page = 1, limit = 9) {


    const baseKey = query ? `audios:query:${query.toLowerCase().trim()}` : 'audios:all';
    const CACHE_KEY = `${baseKey}:page:${page}:limit:${limit}`;

    try {
        await dbConnect()
        
        const skip = (page - 1) * limit
        const cachedResult = await redis.get(CACHE_KEY)
        if (cachedResult) {
            
            return JSON.parse(cachedResult);
        }

        let conditions = {};

        if (query) {
            conditions = {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { "author.fullName": { $regex: query, $options: 'i' } }
                ]
            };
        }

        const getAllAudios = await Speech.find(conditions)
            .populate({ path: 'author', model: User, select: '-password -role' })
            .sort({ _creationTime: -1 })
            .skip(skip)
            .limit(limit)

        await redis.setex(CACHE_KEY, TTL, JSON.stringify(getAllAudios));

        return JSON.parse(JSON.stringify(getAllAudios));
    } catch (error) {
        console.error(error)
    }
}

export async function createAudio({ audio }: paramsForAudio) {

    try {
        await dbConnect()

        const tokenData = await getToken()

        if(!tokenData) throw new Error('Unauthorized')

        const userid = tokenData.id
 

        const { job_id } = await submitItsRequest(audio.description, 'opus', audio.gender)
       
        
        // const job_id = "068319a8-04f1-7a4d-8000-43aa8b09cd27"
        const resultBuffer = await queryTtsResult(job_id)

        const audioBuffer = resultBuffer.audioBuffer
        const audioDuration = resultBuffer.duration as number
       

        const uint8Array = new Uint8Array(audioBuffer);
        const blob = new Blob([uint8Array], { type: "audio/mpeg" })

        const getAudioUrl = await saveAudioToUT(blob)

        const slug = generateSlug(audio.title)
        // const duration = formatTime(audioDuration)

        const newAudio = await Speech.create({
            job_id,
            title: audio.title,
            description: audio.description,
            slug,
            tts_model: audio.gender,
            url: getAudioUrl,
            thumbnail: audio.thumbnail,
            duration: audioDuration,
            author: userid
        })

        const keys = await redis.keys('audios:all:*');
        if (keys.length) {
            await redis.del(...keys); 
        }
        await revalidateCache({ slug, authorNip: userid })
        revalidatePath('/')

        return JSON.parse(JSON.stringify(newAudio))


       
        // console.time("check 1")
        // const findUser = await User.findOne({_id: userid}).select('-password -role')
        // console.timeEnd("check 1")


        // if(!findUser) {
        //     throw new Error('User tidak ditemukan')
        //     return null
        // }    


        // const response = await generateAudio({
        //     title: audio.title,
        //     lyrics: audio.lyrics,
        //     gender: audio.gender
        // })
        // console.log("res",response.task_id)
        // const task_id = response.task_id as string
        // console.log(task_id)
        // const task_id = "24ff3e77-4ce4-46f4-8664-d499d5ac805b"

    

        // if(!task_id) {
        //     throw new Error('Task ID is required');
        // }

        // const slug = generateSlug(audio.title)

        // const saveTaskId = await CreateAudio.create({
        //     task_id,
        //     title: audio.title,
        //     slug,
        //     gender: audio.gender,
        //     thumbnail: audio.thumbnail,
        //     author: userid
        // })

        // revalidatePath('/')

        // return JSON.stringify(JSON.parse(saveTaskId))

        
        // const fetchedAudio = await fetchAudio(task_id)
        // console.log(fetchedAudio)
        

        // const audio_url = fetchedAudio.audio_url
        // const duration = fetchedAudio.duration || ""
    

        // const response3 = await fetch(audio_url)

        // const blob = await response3.blob()

        // const saveAudio = await saveAudioToUT(blob)

        // const slug = generateSlug(audio.title)

        // const newAudio = await Audio.create({
        //     task_id,
        //     title: audio.title,
        //     lyrics: audio.lyrics,
        //     slug,
        //     gender: audio.gender,
        //     audio: saveAudio,
        //     thumbnail: audio.thumbnail,
        //     duration,
        //     author: userid
        // })

        // return JSON.parse(JSON.stringify(saveTaskId))

        
       

    } catch (error) {
        console.error(error)
    }

        
}

export async function getAudioBySlug(slug: string) {

    const CACHE_KEY = `audio:slug:${slug}`

    try {

        return getCachedOrDB(CACHE_KEY, async () => {
            await dbConnect()
            const audioBySlug = await Speech.findOne({ slug })
                .populate({ path: 'author', model: User, select: '-password -role' })

            return JSON.parse(JSON.stringify(audioBySlug))
        }) 

        // const cached = await redis.get(CACHE_KEY);
        // if (cached) {
        //     return JSON.parse(cached);
        // }
        // const audioBySlug = await Speech.findOne({ slug })
        //     .populate({ path: 'author', model: User, select: '-password -role' })

        // if(audioBySlug) {
        //     await redis.setex(CACHE_KEY, TTL, JSON.stringify(audioBySlug))
        //     return JSON.parse(JSON.stringify(audioBySlug))
        // }
        
        // return null;            

        
    } catch (error) {
        console.error(error)
    }
    
}

export async function updateAudio({ audio, audioSlug }: paramsForAudio) {
    try {
        await dbConnect()

        const tokenData = await getToken()

        if(!tokenData) throw new Error('Unauthorized')

        const userid = tokenData.id

        const findAudiotoUpdate = await Speech.findOne({ slug: audioSlug })
        
        if(!findAudiotoUpdate || findAudiotoUpdate.author.toHexString() !== userid) {
            throw new Error("Unauthorized")
        }

        const oldThumbnailUrl = findAudiotoUpdate.thumbnail

        const oldThumbnailKey = oldThumbnailUrl.split('/f/')[1]

        const utapi = new UTApi();
        if (oldThumbnailKey) {
            await utapi.deleteFiles([oldThumbnailKey]);
        }

        const update = {
            title: audio.title,
            slug: generateSlug(audio.title),
            thumbnail: audio.thumbnail
        }

        const filter = {
            slug: audioSlug
        }

        

        const updatedAudio = await Speech.findOneAndUpdate(filter, update, { new: true })


        await redis.del(`audio:slug:${audioSlug}`);

       

        revalidatePath(`/audio/${audioSlug}`);
        

        return JSON.parse(JSON.stringify(updatedAudio))
    } catch(e) {
        console.error(e)
    }
}

export async function deleteAudio(audioSlug: string) {
    try {

        await dbConnect();

        const audioDoc = await Speech.findOne({ slug: audioSlug });
        // const taskDoc = await CreateAudio.findOne({ slug: audioSlug });

        if (!audioDoc) {
            throw new Error("Audio document not found");
        }

        const audioUrlPart = audioDoc.url?.split('/f/')[1];
        const thumbnailUrlPart = audioDoc.thumbnail?.split('/f/')[1]?.split('-')[0];

        const filesToDelete = [audioUrlPart, thumbnailUrlPart].filter(Boolean);
        const utapi = new UTApi();

        if (filesToDelete.length > 0) {
            await utapi.deleteFiles(filesToDelete);
        }

        const deletedAudio = await Speech.findOneAndDelete({ slug: audioSlug });
        // const deletedTask = await CreateAudio.findOneAndDelete({ slug: audioSlug });

        const authorNip = audioDoc.author?.nip

        await revalidateCache({ slug: audioSlug, authorNip })
        revalidatePath('/');

        return JSON.parse(JSON.stringify(deletedAudio))
        
    } catch(e) {
        console.error(e)
    }
}

export async function getAudioByAuthor(nip: string) {
    const CACHE_KEY = `audio:author:${nip}`
    
    try {
        
        return getCachedOrDB(CACHE_KEY, async () => {
            
            await dbConnect()
            const getAuthorByNip = await User.findOne({ nip })
            const userid = getAuthorByNip?._id
            
            
            const audioByAuthor = await Speech.find({ author: userid })
                .populate({ path: 'author', model: User, select: '-password -role' })
            return JSON.parse(JSON.stringify(audioByAuthor))
        })



    } catch(e) {
        console.error(e)
    }
}

export async function getAllModel(): Promise<Model[]> {
    try {
        if (!prosaApiKey) throw new Error("API key is missing");
        const response = await fetch('https://api.prosa.ai/v2/speech/tts/models', {
            method: 'GET',
            headers: {
                'x-api-key': prosaApiKey
            }
        })

        const result = await response.json()

        return JSON.parse(JSON.stringify(result))
        
    } catch (error) {
        console.error(error)
        return []
    }
}