import { newSecretKey } from "@/constans"
import { randomUUID } from "crypto"
import { UTApi } from "uploadthing/server"
import NodeCache from "node-cache"

export async function generateAudio({
    title,
    lyrics,
    gender,
  }: {
    title: String;
    lyrics: string;
    gender: string;
    }): Promise<{ taskId: string }> {
        const response = await fetch('https://api.musicapi.ai/api/v1/sonic/create', {
            method: 'POST',
            headers: {
                authorization: newSecretKey as string,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'custom_mode': true,
                'prompt': lyrics,
                'title': title,
                'tags': `nursery kids song, female song, harmonica, piano, guitar, drum, volin, tuba, flute, xylophone`,
                'mv': 'sonic-v3-5'
            })
        })

        const result = response.json()
        
        if(response.status !== 200) {
            throw new Error("Gagal membuat musik")
        }

        return result
        
}

export async function fetchAudio(task_id: string): Promise<{
    title: string
    lyrics: string
    tags: string[]
    audio_url: string
    duration: string
}> {
    const cache = new NodeCache({ stdTTL: 3600 })
    const cacheKey = `audio_${task_id}`
    const cachedData = cache.get(cacheKey)
    console.log(cachedData)

    const response = await fetch(`https://api.musicapi.ai/api/v1/sonic/task/${task_id}`, {
        method: 'GET',
        headers: {
            authorization: newSecretKey as string
        }
    })

    if(response.status !== 200) {
        throw new Error("Gagal membuat musik")
    }

    const result = await response.json()
    const data = result.data[0]

    if (!data || !data.audio_url) {
        throw new Error("Data audio tidak valid atau URL audio tidak ditemukan");
    }

    const audioData = {
        title: data.title,
        lyrics: data.lyrics,
        tags: data.tags,
        audio_url: data.audio_url,
        duration: data.duration,
    }
    cache.set(cacheKey, audioData)
    return audioData; 
}

export async function saveAudioToUT(fileBlob: Blob) {
    const fileName = randomUUID()
    const file = new File([fileBlob], `${fileName}.mp3`, { type: "audio/mpeg" });
    const utapi = new UTApi()

    const uploadFile = await utapi.uploadFiles(file)

    if(!uploadFile) {
        throw new Error("Error upload audio")
    }

    return uploadFile.data?.url
}