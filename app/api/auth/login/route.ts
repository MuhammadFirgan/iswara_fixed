
import { dbConnect } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Role from "@/lib/database/models/role.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        const { nip, password } = await req.json(); 
        
        const user = await User.findOne({nip}).populate({ path: 'role', model: Role, select: 'name' })
        
    
        if (!user) {
         
          return NextResponse.json({success: false, message: 'Silahkan periksa nip dan password anda'}, { status: 404 });
        }

        const checkPassword = await bcryptjs.compare(password, user.password)
    
        if(!checkPassword) {
            return NextResponse.json({success: false, message: 'Silahkan periksa nip dan password anda'}, { status: 404 });
        }

        const tokenData = {
          id: user._id,
          fullName: user.fullName,
          role: user?.role.name
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRETKEY!, { expiresIn: '900' })

        const response = NextResponse.json({ success: true, message: 'Login berhasil!', user: { nip: user.nip, fullName: user.fullName } },
          { status: 200 })
        response.cookies.set('token', token, { httpOnly: true, sameSite: 'strict' })
        
        return response
        
      } catch (error) { 
        return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
      }
}