'use server'
import { checkRole } from '@/lib/actions/user.action';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function getToken() {
  
    const cookie = await cookies()
  
    const token = await cookie.get('token')?.value
    const decode = jwt.decode(token)
    return decode
}