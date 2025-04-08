'use server'

import { paramsForAudio } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { generateSlug, getDuration } from "../utils"
import User from "../database/models/user.model"
import { fetchAudio, generateAudio, saveAudioToUT } from "../helpers/audio"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

export async function getAudios() {
    try {
        await dbConnect()

        console.time("check audios")
        const getAllAudios = await Audio.find().populate({ path: 'author', model: User, select: '-password -role' })
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

        // const response = await generateAudio({
        //     title: audio.title,
        //     lyrics: audio.lyrics,
        //     gender: audio.gender
        // })
        // console.log("res",response)
        const task_id = "933aec2c-00df-4968-b91f-893eab618d48"

        if(!task_id) {
            throw new Error('Task ID is required');
        }

        
        console.time("check 2")
        const { audio_url, duration } = await fetchAudio(task_id)
        console.timeEnd("check 2")


        console.time("check 3")
        const response3 = await fetch(audio_url)

        const blob = await response3.blob()
        console.timeEnd("check 3")

        console.time("check 4")
        const saveAudio = await saveAudioToUT(blob)
        console.timeEnd("check 4")

        const slug = generateSlug(audio.title)

        console.time("check 5")
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

        console.timeEnd("check 5")

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