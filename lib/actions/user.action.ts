'use server'

import bcryptjs from 'bcryptjs'
import { dbConnect } from "../database";
import User, { IUser } from "../database/models/user.model";
import Role from '../database/models/role.model';
import { UploadFileProps, userProps } from '@/types';


export async function createUser(user: IUser) {
  try {
    await dbConnect();

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(user.password, salt);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
    });

    return JSON.parse(JSON.stringify(newUser))

  } catch (error) {
    console.error(error);

  }
}

export async function getAllUser() {
  try {
    await dbConnect()

    const users = await User.find().populate({ path: 'role', model: Role, select: 'name' })

    return JSON.parse(JSON.stringify(users))
  } catch (error) {
    console.log(error)
  }
}

export async function getUserById(id: string) {
  try {
    await dbConnect()

    const userById = await User.findOne({_id: id})
    return JSON.parse(JSON.stringify(userById))
  } catch (error) {
    console.log(error)
  }
}

export async function getUserExist(nip: string, email: string) {
  try {
    await dbConnect()

    const userExist = await User.findOne({
      $or: [{ email }, { nip }]  
    })

    return JSON.parse(JSON.stringify(userExist))

  } catch (error) {
    console.log(error)
  }
}


export async function uploadImageUser({ id, url }: UploadFileProps) {
  try {
    await dbConnect()

    const uploadImage = await User.findOneAndUpdate({
      _id: id,
      photo: url
    })

    return JSON.parse(JSON.stringify(uploadImage))

  } catch (error) {
    console.log(error)
  }
}

export async function updateUser({id, user}: { id: string, user: UserProps }) {
 

  const { fullName, email, role } = user
  try {
    await dbConnect()

    const updateUser = await User.findOneAndUpdate({
      _id: id,
      fullName,
      email,
      role
    })

    if (!updateUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updateUser))

  } catch(e) {
    console.log(e)
  }
}
