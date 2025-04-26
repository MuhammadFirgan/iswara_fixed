'use server'

import { paramsForAudio } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { generateSlug, getDuration } from "../utils"
import User from "../database/models/user.model"
import { fetchAudio, generateAudio, saveAudioToUT } from "../helpers/audio"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

export async function getAudios(query?: string) {
    try {
        await dbConnect()
        

        const audioCondition = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } }, 
            { "author.fullName": { $regex: query, $options: "i" } }, 
          ],
        }
      : {};
        


        console.time("check audios")
        const getAllAudios = await Audio.find(audioCondition)
            .populate({ path: 'author', model: User, select: '-password -role' })
            .sort({ createdAt: 'desc' })
        console.timeEnd("check audios")

        
        return JSON.parse(JSON.stringify(getAllAudios))

    } catch (error) {
        console.error(error)
    }
}

export async function createAudio({ audio, userid }: paramsForAudio) {

    try {
        await dbConnect()


        console.time("check 1")
        const findUser = await User.findOne({_id: userid}).select('-password -role')
        console.timeEnd("check 1")


        if(!findUser) {
            throw new Error('User tidak ditemukan')
            return null
        }    

        const response = await generateAudio({
            title: audio.title,
            lyrics: audio.lyrics,
            gender: audio.gender
        })
        console.log("res",response.task_id)
        const task_id = response.task_id as string
        console.log(task_id)
        // const task_id = "a5c5f802-8259-43d8-9482-cdda8011283e"

    

        if(!task_id) {
            throw new Error('Task ID is required');
        }

        
        const fetchedAudio = await fetchAudio(task_id)
        console.log(fetchedAudio)
        

        const audio_url = fetchedAudio.audio_url
        const duration = fetchedAudio.duration || ""
    

        const response3 = await fetch(audio_url)

        const blob = await response3.blob()

        const saveAudio = await saveAudioToUT(blob)

        const slug = generateSlug(audio.title)

        const newAudio = await Audio.create({
            task_id,
            title: audio.title,
            lyrics: audio.lyrics,
            slug,
            gender: audio.gender,
            audio: saveAudio,
            thumbnail: audio.thumbnail,
            duration,
            author: userid
        })

        return JSON.parse(JSON.stringify(newAudio))
       

    } catch (error) {
        console.error(error)
    }

        
}

export async function getAudioBySlug(slug: string) {
    try {
        await dbConnect()
        const audioBySlug = await Audio.findOne({ slug })
            .populate({ path: 'author', model: User, select: '-password -role' })
            

        return JSON.parse(JSON.stringify(audioBySlug))
        
    } catch (error) {
        console.error(error)
    }
    
}

export async function updateAudio({ userid, audio, audioSlug }: paramsForAudio) {
    try {
        await dbConnect()

        const findAudiotoUpdate = await Audio.findOne({ slug: audioSlug })
        
        if(!findAudiotoUpdate || findAudiotoUpdate.author.toHexString() !== userid) {
            throw new Error("Unauthorized")
        }


        const update = {
            title: audio.title,
            slug: generateSlug(audio.title),
            thumbnail: audio.thumbnail
        }

        const filter = {
            slug: audioSlug
        }

        

        const updatedAudio = await Audio.findOneAndUpdate(filter, update, { new: true })


        revalidatePath(`/audio/${audioSlug}`)
        

        return JSON.parse(JSON.stringify(updatedAudio))
    } catch(e) {
        console.error(e)
    }
}

export async function deleteAudio(audioSlug: string) {
    try {
        await dbConnect()

        const findAudioToDelete = await Audio.findOne({ slug: audioSlug })

        const getAudioUrl = findAudioToDelete.audio
        const getThumbnailUrl = findAudioToDelete.thumbnail

        const audioUrl = getAudioUrl.split('/f/')[1]?.split('-')[0]
        const thumbnailUrl = getThumbnailUrl.split('/f/')[1]?.split('-')[0]

        const utapi = new UTApi()

        await utapi.deleteFiles([ audioUrl, thumbnailUrl ])

        const deleteAudio = await Audio.findOneAndDelete({ slug: audioSlug })

        revalidatePath('/')
        return JSON.parse(JSON.stringify(deleteAudio))

        
    } catch(e) {
        console.error(e)
    }
}

export async function getAudioByAuthor(nip: string) {
    try {
        await dbConnect()

        const getAuthorByNip = await User.findOne({ nip })

        if (!getAuthorByNip) {
            console.error("Author tidak ditemukan")
            throw new Error("gagal")
        }

        const userid = getAuthorByNip._id


        const audioByAuthor = await Audio.find({ author: userid })
            .populate({ path: 'author', model: User, select: '-password -role' })

        return JSON.parse(JSON.stringify(audioByAuthor))

    } catch(e) {
        console.error(e)
    }
}