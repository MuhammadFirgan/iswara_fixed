'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from "next/link"
import { BiHome, BiMenu, BiSolidMegaphone, BiSolidUser } from "react-icons/bi"
import { FaUsersGear } from "react-icons/fa6";
import { Button } from "../ui/button"
import { getToken } from "@/constans/getToken"
import { checkRole } from "@/lib/actions/user.action"
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';
import { barProps } from "./Sidebar";
  

export default function MobileNav({ role, token }: barProps) {

  const pathname = usePathname()
  

  const isActive = (path: string) => pathname === path ? 'bg-primary' : ''

  return (
    <Sheet>
        <SheetTrigger>
        <BiMenu className="w-8 h-8"/>
        </SheetTrigger>
        <SheetContent side="left" className="bg-zinc-900">
        <SheetDescription>
          <div className="flex flex-col py-10 gap-10">
            <Link href="/" className={`flex items-center gap-3 p-2 rounded ${isActive('/')}`}>
              <BiHome className='w-6 h-6' />
              <p className="text-lg">Beranda</p>
            </Link>
            {(role === "admin" || role === "member") && (
              <Link href="/audio/create" className={`flex items-center gap-3 p-2 rounded ${isActive('/audio/create')}`}>
                <BiSolidMegaphone className='w-6 h-6' />
                <p className="text-lg">Buat Audio</p>
              </Link>
            )}
            
            
            {(role === "admin") && (
              <Link href="/management" className={`flex items-center gap-3 p-2 rounded ${isActive('/management')}`}>
                <FaUsersGear className='w-6 h-6' />
                <p className="text-lg">Management</p>
              </Link>
            )}

            {(token) && (
              <Link href="/management" className={`flex items-center gap-3 p-2 rounded ${isActive('/profile')}`}>
                <BiSolidUser className='w-6 h-6' />
                <p className="text-lg">Profile</p>
              </Link>
            )}

            

            {(token) && (
              <LogoutButton />
            )}
          </div>
        </SheetDescription> 
         
        </SheetContent>
    </Sheet>
    
  )
}
