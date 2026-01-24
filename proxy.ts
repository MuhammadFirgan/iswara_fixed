import { NextRequest, NextResponse } from "next/server";

import jwt, { JwtPayload } from 'jsonwebtoken';

export default async function middleware(request: NextRequest) {
  const data = request.cookies.get('token')?.value;

  const token = jwt.decode(data!) as JwtPayload
  const userId = token?.id
 

  if (!token) {
    
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if(token.role !== "admin" && token.role !== "member") {
   
    return NextResponse.redirect(new URL('/', request.url));
  }



}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/audio/create'], 
};
