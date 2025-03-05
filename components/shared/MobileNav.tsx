'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from "next/link"

import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton';

import Image from "next/image";
import { barProps } from "@/app/(root)/layout";

  

export default function MobileNav({ role, token, type = "second" }: barProps) {

  const pathname = usePathname()
  

  const isActive = (path: string) => pathname === path ? 'border-l-2 border-green-500 text-primary fill-green-500' : ''

  return (
    <Sheet>
        <SheetTrigger>
        <Image src="/icons/menu.svg" width={24} height={24} alt="icon sidebar" className="w-8 h-8" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-zinc-900">
        {type === "first" ? (
            <div className="flex flex-col py-10 gap-10 ">
              <Link href="/" className={`flex items-center gap-3 p-2 rounded  ${isActive('/')}`}>
                <svg className={`text-white fill-current border-none ${isActive('/')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path></svg>
                <p className="text-sm">Beranda</p>
              </Link>
              <Link href="/admin/management" className={`flex items-center gap-3 p-2 rounded ${isActive('/admin/management')}`}>
                  <svg className={`text-white fill-current border-none ${isActive('/admin/management')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                  <p className="text-sm">Operator</p>
                </Link>
              <Link href="/admin/addUser" className={`flex items-center gap-3 p-2 rounded ${isActive('/admin/addUser')}`}>
                  <Image src="/icons/user.svg" width={24} height={24} alt="icon sidebar" className="text-white" />
                  <p className="text-sm">Add User</p>
                </Link>
            </div>
            
            
          ) : (
            
            <div className="flex flex-col py-10 gap-10 ">
              
              <Link href="/" className={`flex items-center gap-3 p-2 rounded  ${isActive('/')}`}>
                <svg className={`text-white fill-current border-none ${isActive('/')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path></svg>
                <p className="text-sm">Beranda</p>
              </Link>
              {(role === "admin" || role === "member") && (
                <Link href="/audio/create" className={`flex items-center gap-3 p-2 rounded ${isActive('/audio/create')}`}>
                  <Image src="/icons/megaphone.svg" width={24} height={24} alt="icon sidebar" className="text-white" />
                  <p className="text-sm">Buat Audio</p>
                </Link>
              )}
              
              
              {(role === "admin") && (
                <Link href="/admin/management" className={`flex items-center gap-3 p-2 rounded ${isActive('/admin/management')}`}>
                  <svg className={`text-white fill-current border-none ${isActive('/admin/management')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                  <p className="text-sm">Operator</p>
                </Link>
              )}
              {(token) && (
                <Link href={`/profile/${(token as { id: string })?.id}`} className={`flex items-center gap-3 p-2 rounded ${isActive('/profile')}`}>
                  <svg className={`text-white fill-current border-none ${isActive('/profile')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                  <p className="text-sm">Profile</p>
                </Link>
              )}
  
              
  
              {(token) && (
                <LogoutButton />
              )}
            </div>
          )}

         
        </SheetContent>
    </Sheet>
    
  )
}
