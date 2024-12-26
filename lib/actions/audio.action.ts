'use server'

import { audioProps } from "@/types"
import { dbConnect } from "../database"


export async function createAudio(value: audioProps) {
    try {
        await dbConnect()
        console.log(value)


    } catch (error) {
        console.log(error)
    }
}