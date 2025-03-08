'use server'

import { audioProps } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { randomUUID } from "crypto"
import { getDuration } from "../utils"
import User from "../database/models/user.model"

const getVoiceClone = () => {

}


export async function createAudio({ audio, userid }: audioProps) {

    try {
        await dbConnect()

        const findUser = User.findOne({_id: userid})

        if(!findUser) throw new Error('User tidak ditemukan')

        const newAudio = await Audio.create({...audio})

        return JSON.parse(JSON.stringify(newAudio))

    } catch (error) {
        console.error(error)
    }
    
      
}