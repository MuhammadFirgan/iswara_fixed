'use server'

import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function getToken() {
  
    const cookie = await cookies()
  
    const token = await cookie.get('token')?.value
    const decode = jwt.decode(token!) as JwtPayload
    return decode
}