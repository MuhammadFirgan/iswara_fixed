'use client'
import Link from 'next/link'

import { BiHome, BiSolidMegaphone, BiSolidUser,  } from 'react-icons/bi'
import { FaUsersGear } from "react-icons/fa6";

import { usePathname } from 'next/navigation'

import LogoutButton from './LogoutButton';
import { barProps } from '@/app/(root)/layout';




export default function Sidebar({ role, token, type = "second" } : barProps) {


  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path ? 'bg-primary' : ''

  return (
    <>
      <aside className=" min-h-screen p-6 w-[250px] bg-neutral-950 border-r-2 border-zinc-800">
        <div className="flex-col flex-between gap-5 hidden lg:flex">
          {type === "first" ? (
            <div className="flex flex-col py-10 gap-10 ">
              <Link href="/" className={`flex items-center gap-3 p-2 rounded  ${isActive('/')}`}>
                <BiHome className='w-6 h-6' />
                <p className="text-sm">Beranda</p>
              </Link>
              <Link href="/admin/management" className={`flex items-center gap-3 p-2 rounded ${isActive('/admin/management')}`}>
                  <FaUsersGear className='w-6 h-6' />
                  <p className="text-sm">Management</p>
                </Link>
              <Link href="/admin/addUser" className={`flex items-center gap-3 p-2 rounded ${isActive('/admin/addUser')}`}>
                  <BiSolidUser className='w-6 h-6' />
                  <p className="text-sm">Add User</p>
                </Link>
            </div>
            
            
          ) : (
            
            <div className="flex flex-col py-10 gap-10 ">
              
              <Link href="/" className={`flex items-center gap-3 p-2 rounded  ${isActive('/')}`}>
                <BiHome className='w-6 h-6' />
                <p className="text-sm">Beranda</p>
              </Link>
              {(role === "admin" || role === "member") && (
                <Link href="/audio/create" className={`flex items-center gap-3 p-2 rounded ${isActive('/audio/create')}`}>
                  <BiSolidMegaphone className='w-6 h-6' />
                  <p className="text-sm">Buat Audio</p>
                </Link>
              )}
              
              
              {(role === "admin") && (
                <Link href="/admin/management" className={`flex items-center gap-3 p-2 rounded ${isActive('/admin/management')}`}>
                  <FaUsersGear className='w-6 h-6' />
                  <p className="text-sm">Management</p>
                </Link>
              )}
              {(token) && (
                <Link href={`/profile/${(token as { id: string })?.id}`} className={`flex items-center gap-3 p-2 rounded ${isActive('/profile')}`}>
                  <BiSolidUser className='w-6 h-6' />
                  <p className="text-sm">Profile</p>
                </Link>
              )}
  
              
  
              {(token) && (
                <LogoutButton />
              )}
            </div>
          )}
        </div>
      </aside>
      
    </>
  )
}
