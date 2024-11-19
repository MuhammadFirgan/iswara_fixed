'use server'


import { dbConnect } from "../database"
import Role from './../database/models/role.model';

export async function getRole() {
    
    try {
        await dbConnect()
        const data = await Role.find()
        return { data: JSON.parse(JSON.stringify(data)) };
    } catch (error) {
        console.log(error)
    }
}
