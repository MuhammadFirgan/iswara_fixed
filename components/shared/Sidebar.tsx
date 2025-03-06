'use client'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import LogoutButton from './LogoutButton';

import Image from 'next/image';
import { barProps } from '@/app/(root)/layout';






export default function Sidebar({ role, token, type = "second" } : barProps) {
 

  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path ? 'border-l-2 border-green-500 text-primary fill-green-500' : ''

  return (
    <>
      <aside className=" min-h-screen w-[200px] bg-neutral-900 ">
        <div className="flex-col flex-between gap-5 hidden sm:flex">
          {type === "first" ? (
            <div className="flex flex-col py-10 gap-10 ">
              <Link href="/" className={`flex items-center gap-3 p-5  ${isActive('/')}`}>
              <svg className={`text-white fill-current border-none ${isActive('/')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path></svg>
              
                <p className="text-sm">Beranda</p>
              </Link>
              <Link href="/admin/management" className={`flex items-center gap-3 px-5 py-2 ${isActive('/admin/management')} `}>
                  
                <svg className={`text-white fill-current border-none ${isActive('/admin/management')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                <p className="text-sm">Operator</p>
              </Link>
              <Link href="/admin/voice_clone_list" className={`flex items-center gap-3 px-5 py-2 ${isActive('/admin/voice_clone_list')} `}>
                  
            
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={`text-white fill-current border-none ${isActive('admin/voice_clone_list')}`}><path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z"></path><path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z"></path></svg>
                <p className="text-sm">Clone List</p>
              </Link>
              <Link href="/admin/addUser" className={`flex items-center gap-3 px-5 py-2  ${isActive('/admin/addUser')}`}>
                  <Image src="/icons/user.svg" width={24} height={24} alt="icon sidebar"  />
                  <p className="text-sm">Add User</p>
                </Link>
            </div>
            
            
          ) : (
            
            <div className="flex flex-col py-10 gap-10 ">
              <div className="mx-4">
                <Link href={token ? `/audio/create` : '/sign-in'}  className="flex items-center gap-3 px-5 py-4 rounded  bg-primary w-full">
                    <Image src="/icons/megaphone.svg" width={24} height={24} alt="icon sidebar" className="text-white" />
                    <p className="text-sm">Buat Audio</p>
                </Link>
                
              </div>
              <Link href="/" className={`flex items-center gap-3 px-5 py-2  ${isActive('/')}`}>
                <svg className={`text-white fill-current border-none ${isActive('/')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.74 2.32a1 1 0 0 0-1.48 0l-9 10A1 1 0 0 0 3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 1 1 0 0 0-.26-.68z"></path></svg>
                <p className="text-sm">Beranda</p>
              </Link>
              
              
              {(role === "admin") && (
                <Link href="/admin/management" className={`flex items-center gap-3 px-5 py-2 ${isActive('/admin/management')}`}>
                   <svg className={`text-white fill-current border-none ${isActive('/admin/management')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>
                  <p className="text-sm">Operator</p>
                </Link>
              )}
              <Link href={token ? `/profile/${(token as { id: string })?.id}` : '/sign-in'}  className={`flex items-center gap-3 px-5 py-2 ${isActive('/profile')}`}>
                <svg className={`text-white fill-current border-none ${isActive('/profile')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                <p className="text-sm">Profile</p>
              </Link>
             
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
