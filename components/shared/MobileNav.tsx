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

import Quickstats from "./Quickstats";
import { Button } from "../ui/button";
import Search from "./SearchInput";
import { barProps } from "@/types";

  

export default function MobileNav({ name, total, image, role, token, type = "second" }: barProps) {

  const pathname = usePathname()
  

  const isActive = (path: string) => pathname === path ? 'border-l-2 border-green-500 text-primary fill-green-500' : ''

  return (
    <Sheet>
        <SheetTrigger>
          <Image src="/icons/menu.svg" width={24} height={24} alt="icon sidebar" className="w-8 h-8" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#0f0f0f] border-none">
        {type === "first" ? (
          <div className="flex flex-col py-10 gap-10 ">
            <Link href="/" className={`flex items-center gap-3 p-5 over:bg-gray-700/50 ${isActive('/')} h`}>
            <svg className={`text-white fill-current border-none ${isActive('/')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path></svg>
            
              <p className="text-sm">Beranda</p>
            </Link>
            <Link href="/admin/management" className={`flex hover:bg-gray-700/50 items-center gap-3 px-5 py-2 ${isActive('/admin/management')} `}>
                
              <svg className={`text-white fill-current border-none ${isActive('/admin/management')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
              <p className="text-sm">Operator</p>
            </Link>
          
            <Link href="/admin/addUser" className={`flex items-center gap-3 px-5 py-2  ${isActive('/admin/addUser')}`}>
              <Image src="/icons/user.svg" width={24} height={24} alt="icon sidebar"  />
              <p className="text-sm">Add User</p>
            </Link>
          </div>
            
            
          ) : (
            
            <div className="flex flex-col py-6 h-screen justify-between">
              <div className="mx-4 flex flex-col gap-4">
                {/* <Link href={token ? `/audio/create` : '/sign-in'}  className="flex items-center gap-3 px-5 py-4 rounded  bg-primary w-full">
                    <Image src="/icons/megaphone.svg" width={24} height={24} alt="icon sidebar" className="text-white" />
                    <p className="text-sm">Buat Audio</p>
                </Link> */}

                
                <Search />
                
                <Link href="/" className={`flex items-center gap-3 px-5 py-2  ${isActive('/')}`}>
                  <svg className={`text-white fill-current border-none ${isActive('/')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path></svg>
                  <p className="text-sm">Beranda</p>
                </Link>
                
                
                {(role === "admin") && (
                  <Link href="/admin/management" className={`flex items-center gap-3 px-5 hover:bg-gray-700/50 py-2 ${isActive('/admin/management')}`}>
                    <svg className={`text-white fill-current border-none ${isActive('/admin/management')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                    <p className="text-sm">Operator</p>
                  </Link>
                )}
              </div>
  
              
  
              <div className="px-5">
                {token ? (
                  // Perbaikan: Tambahkan operator Non-null Assertion (!) untuk memberitahu TypeScript 
                  // bahwa di dalam blok ini, token dijamin ada.
                  <Quickstats name={name!} role={role!} image={image!} total={total!} token={token!}/>
                ) : (
                  <Button asChild className="rounded-full bg-primary w-full">
                    <Link href="/sign-in">Masuk</Link>      
                  </Button>
                )}
              </div>
            </div>
          )}

          
        </SheetContent>
    </Sheet>
    
  )
}
