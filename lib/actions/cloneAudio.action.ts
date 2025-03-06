'use server'

import { secretKey, userId } from "@/constans";
import { dbConnect } from "../database";
import CloneAudio from "../database/models/clone.model";



export async function createCloneAudio({ name, myFile }: { name: string, myFile: File }) {
    try {
        await dbConnect()

               
        const formData = new FormData();
        formData.append('sample_file', myFile);
        formData.append('voice_name', name)


        const url = 'https://api.play.ht/api/v2/cloned-voices/instant';
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            AUTHORIZATION: secretKey,
            'X-USER-ID': userId
          },
          body: formData
        };
        
        const response = await fetch(url, options)
        const result = await response.json()


        const newCloneAudio = await CloneAudio.create({
            name: result.name,
            fileUrl: result.id
        })

        console.log(newCloneAudio)
        
        return JSON.parse(JSON.stringify(newCloneAudio))
    } catch(e) {
        console.error(e)
    }
}

export async function getCloneAudio() {
    try {
        await dbConnect()

        const getClone = await CloneAudio.find()
        return JSON.parse(JSON.stringify(getClone))
    } catch (error) {
        console.error(error)
    }
}

export async function deleteCloneAudio({ voiceUrl, voiceId }: { voiceUrl: string; voiceId: string }) {
    try {
        dbConnect()

        const url = 'https://api.play.ht/api/v2/cloned-voices/';
        const options = {
            method: 'DELETE',
            headers: {
                accept: 'application/json', 
                'content-type': 'application/json',
                AUTHORIZATION: secretKey,
                'X-USER-ID': userId
            },
            
            body: JSON.stringify({voice_id: voiceUrl})
        };

        const response = await fetch(url, options)
        const result = await response.json()

        console.log(result)

        const deleteAudio = await CloneAudio.deleteOne({ _id: voiceId  })

        return JSON.parse(JSON.stringify(deleteAudio))

        
    } catch (error) {
        console.error(error)
    }
}