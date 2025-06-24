'use server'

import bcryptjs from 'bcryptjs'
import { dbConnect } from "../database";
import User, { IUser } from "../database/models/user.model";
import Role from '../database/models/role.model';
import { createUserProps, UploadFileProps, UserProps } from '@/types';
import { revalidatePath } from 'next/cache';
import redis from '../redis';
import { getCachedOrDB } from '../cache';


type PaginationProps = {
  page?: number
  limit?: number
}


export async function createUser(user: createUserProps) {
  try {
    await dbConnect();

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(user.password, salt);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
    });

    revalidatePath('/admin/management')

    return JSON.parse(JSON.stringify(newUser))

  } catch (error) {
    console.error(error);

  }
}

export async function getAllUser({ page = 1, limit = 10 }: PaginationProps) {

  const skip = (page - 1) * limit
  try {

    return getCachedOrDB('authors:all', async () => {
      await dbConnect()

      const [users, totalCount] = await Promise.all([
        User.find()
          .populate({ path: 'role', model: Role, select: 'name' })
          .skip(skip)
          .limit(limit),
        User.countDocuments()
      ])
      const result = {
        users,
        pagination: {
          currentPage: page,
          totalPage: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          itemsPerPage: limit
        }
      }

      return JSON.parse(JSON.stringify(result))
    })


  } catch (error) {
    console.log(error)
  }
}

export async function getUserById(id: string) {

  const cacheKey = `author:${id}`
  try {
    // await dbConnect()

    // const cached = await redis.get(cacheKey)

    // if(cached) JSON.parse(cached)

    // const userById = await User.findOne({_id: id}).select('-password')

    // if(userById) {
    //   await redis.setex(cacheKey, TTL, JSON.stringify(userById))
    // }

    // return JSON.parse(JSON.stringify(userById))

    return getCachedOrDB(cacheKey, async () => {
      await dbConnect()
      const userById = await User.findOne({_id: id}).select('-password')
      return JSON.parse(JSON.stringify(userById))

    })
  } catch (error) {
    console.error(error)
  }
}

export async function getUserExist(nip: string, email: string) {
  try {

    return getCachedOrDB(`userExist:${nip}`, async () => {
      await dbConnect()
  
      const userExist = await User.findOne({
        $or: [{ email }, { nip }]  
      })
  
      return JSON.parse(JSON.stringify(userExist))
    })

  } catch (error) {
    console.error(error)
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
    console.error(error)
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

    revalidatePath('/admin/management')
    return JSON.parse(JSON.stringify(updateUser))

  } catch(e) {
    console.error(e)
  }
}
