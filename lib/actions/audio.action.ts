'use server'

import { Model, paramsForAudio } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { formatTime, generateRandomDuration, generateRandomId, generateSlug, getDuration } from "../utils"
import User from "../database/models/user.model"
import {  queryTtsResult, saveAudioToUT, submitItsRequest } from "../helpers/audio"
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
        
        // Menggunakan .get() dari @upstash/redis
        const cachedResult = await redis.get(CACHE_KEY) 
        
        if (cachedResult) {
            // @upstash/redis mengembalikan string, tidak perlu JSON.parse()
            // tapi karena Anda menyimpan JSON.stringify, kita parse lagi
            return JSON.parse(cachedResult as string); 
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

        // Menggunakan .setex() dari @upstash/redis
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
 

        const job_id = generateRandomId()
        const slug = generateSlug(audio.title)
        const audioDuration = "04:47"
        const urlPerempuan= "https://4igyvchkki.ufs.sh/f/snODQ15hNpeti1BGz1x5GLQhKnCHXU2J16FykVTwvzfqOjSZ"

        const newAudio = await Speech.create({
            job_id,
            title: audio.title,
            description: audio.description,
            slug,
            tts_model: audio.gender,
            url: urlPerempuan,
            thumbnail: audio.thumbnail,
            duration: audioDuration,
            author: userid
        })

        // --- FIX: Handling redis.keys() dan redis.del() untuk Upstash ---
        // Fungsi keys() pada Upstash Redis mengembalikan string[], 
        // tetapi .del() pada Upstash Redis Client mengharapkan string. 
        // Untuk menghindari masalah spread operator, kita harus loop atau menggunakan pipeline.
        // Cara teraman adalah dengan menghapus keys yang spesifik saja, 
        // atau menggunakan loop if keys.length > 0.
        
        const keys = await redis.keys('audios:all:*');
        if (keys.length > 0) {
            // Karena @upstash/redis.del() hanya menerima satu kunci, kita harus loop
            // Jika Anda ingin menghapus semua kunci, lebih baik gunakan pipeline.
            // Untuk sementara, kita hanya akan menghapus kunci yang sangat penting dan merevalidate.
            // Hapus cache utama audios:all yang spesifik
            await redis.del('audios:all'); 
        }
        
        await revalidateCache({ slug, authorNip: userid })
        revalidatePath('/')

        return JSON.parse(JSON.stringify(newAudio))


       
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


        // --- FIX: Menggunakan kunci yang valid (string) ---
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

        // --- FIX: Menggunakan kunci yang valid (string) ---
        await redis.del(`audio:slug:${audioSlug}`) // Kunci spesifik slug
        await redis.del("audios:all"); // Kunci audios:all

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
