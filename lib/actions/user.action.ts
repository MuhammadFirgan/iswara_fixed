'use server'

import { redirect } from "next/navigation";
import bcryptjs from 'bcryptjs'
import { dbConnect } from "../database";
import User, { IUser } from "../database/models/user.model";



export async function createUser(user: IUser) {

  try {
    await dbConnect()
    const nip = user.nip

    const findUser = await User.findOne({nip})
    console.log(findUser)
    
    
    const userExist = await User.findOne({nip: '210210204227'}).populate('role')
    console.log(userExist)
    

    if(userExist) throw new Error('Nip sudah terdaftar')

    if (user.role.name === 'admin') {
        const salt = await bcryptjs.genSalt(12)
            
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        const newUser = await User.create({...user, password: hashedPassword})
        if (newUser) {
          return redirect('/management')
        }

        return JSON.parse(JSON.stringify(newUser))
    } else {
        throw new Error('role tidak diijinkan')
    }

  } catch (error) {
    console.log(error)
  }
}

export async function getAllUser() {
  try {
    await dbConnect()

    const users = await User.find().populate('role')
    

    return JSON.parse(JSON.stringify(users))
  } catch (error) {
    console.log(error)
  }
}

export async function getUserByRole(id: string) {
  
  try {
    await dbConnect()
    const user = await User.findOne({_id: id}).populate('role')

    return JSON.parse(JSON.stringify(user))
    
  } catch (error) {
    console.log(error)
  }
}