'use server'

import { audioProps } from "@/types"
import { dbConnect } from "../database"
import Audio from "../database/models/audio.model"
import { randomUUID } from "crypto"
import { getDuration } from "../utils"
// import * as PlayHT from 'playht';

// PlayHT.init({
//   apiKey: process.env.PLAYHT_SECRET_KEY,
//   userId: process.env.PLAYHT_USER_ID,
// });



export async function createAudio(value: audioProps) {
 
    
      
}