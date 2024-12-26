import { getToken } from "@/constans/getToken";
import { dbConnect } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from '@/lib/database/models/user.model';

export async function POST(req: NextRequest) {
    try {
        await dbConnect()
    
        const { newPassword, repeatPassword } = await req.json()
    
       if(newPassword !== repeatPassword) {
            return NextResponse.json({'message': 'Password tidak sesuai, coba ulangi'}, { 'status': 500 })
       }

       const token = await getToken()
       const userId = token?.id

       const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const updatePassword = await User.findOneAndUpdate({
            _id: userId,
            password: hashedPassword
        })

        if(!updatePassword) {
            return NextResponse.json({'message': 'Password gagal diubah'}, { 'status': 500 })
        }

        return NextResponse.json({ 'message': 'Password berhasil diubah' }, { 'status': 200 })


        
    } catch (error) {
        return NextResponse.json({'message': 'Terjadi kesalahan'}, { 'status': 500 })
    }
}