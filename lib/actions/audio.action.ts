'use server'

import { audioProps } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { generateSlug, getDuration } from "../utils"
import User from "../database/models/user.model"
import { fetchAudio, saveAudioToUT } from "../helpers/audio"

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

export async function createAudio({ audio, userid }: audioProps) {


    try {
        await dbConnect()

        console.time("check 1")
        const findUser = await User.findOne({_id: userid}).select('-password -role')
        console.timeEnd("check 1")


        if(!findUser) {
            throw new Error('User tidak ditemukan')
            return null
        }    


        // const response1 = await fetch('https://api.musicapi.ai/api/v1/sonic/create', {
        //     method: 'POST',
        //     headers: {
        //         authorization: newSecretKey as string
        //     },
        //     body: JSON.stringify({
        //         'custom_mode': true,
        //         'prompt': audio.lyrics,
        //         'title': audio.title,
        //         'tags': `nursery kids song, ${audio.genre} harmonica, piano, guitar, drum, volin, tuba, flute, xylophone`,
        //         'mv': 'sonic-v3-5'
        //     })
        // })

        // const result1 = response1.json()
        
        // if(response1.status !== 200) {
        //     throw new Error("Gagal membuat musik")
        // }


        // const task_id = result1?.task_id
        const task_id = "8cfff3ea-c818-4de4-b923-79a74a7fd182"

        if(!task_id) {
            throw new Error('Task ID is required');
        }

        
        console.time("check 2")
        const { title, lyrics, tags, audio_url, duration } = await fetchAudio(task_id)
        console.log(title)
        console.timeEnd("check 2")


        console.time("check 3")
        const response3 = await fetch(audio_url)

        const blob = await response3.blob()
        console.timeEnd("check 3")

        console.time("check 4")
        const saveAudio = await saveAudioToUT(blob)
        console.timeEnd("check 4")

        const slug = generateSlug(title)

        console.time("check 5")
        const newAudio = await Audio.create({
            task_id,
            title,
            lyrics,
            slug,
            gender: audio.gender,
            audio: saveAudio,
            thumbnail: audio.thumbnail,
            duration,
            author: userid
        })

        console.timeEnd("check 5")

        return JSON.parse(JSON.stringify(newAudio))
       
        // console.log(result2.data[0].audio_url)

    } catch (error) {
        console.error(error)
    }

        
}

export async function getAudioBySlug(slug: string) {
    try {
        await dbConnect()
        const audioBySlug = await Audio.findOne({ slug }).populate({ path: 'author', model: User, select: '-password -role' })

        return JSON.parse(JSON.stringify(audioBySlug))
        
    } catch (error) {
        console.error(error)
    }
    
}