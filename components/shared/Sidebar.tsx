'use client'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import LogoutButton from './LogoutButton';

import Image from 'next/image';
import { barProps } from '@/app/(root)/layout';
import Search from './SearchInput';
import Quickstats from './Quickstats';
import { Button } from '../ui/button';


export default function Sidebar({ name, total, image, role, token, type = "second" } : barProps) {
 

  const pathname = usePathname()
  
  const isActive = (path: string) => pathname === path ? 'bg-primary' : ''


  return (
    <>
      <aside className={`min-h-screen ${type === "second" ? "w-[300px]" : "w-[250px]"} bg-[#0f0f0f] backdrop-blur-md flex flex-col h-screen overflow-y-auto no-scrollbar`}>
        <div className="flex-col flex-between gap-5 hidden sm:flex">
          {type === "first" ? (
            <div className="flex flex-col py-10 gap-7 mx-4">
              <Link 
                href="/" 
                className={`flex items-center gap-3 px-5 py-2 hover:text-emerald-300 hover:bg-gray-700/50 hover:fill-emerald-300 ${isActive('/')} `}>
                <Image src="/icons/home.svg" width={24} height={24} alt="icons"/>
              
                <p className="text-sm">Beranda</p>
              </Link>
              <Link 
                href="/admin/management" 
                className={`flex hover:text-emerald-300 hover:bg-gray-700/50 hover:fill-emerald-300 items-center gap-3 px-5 py-2 ${isActive('/admin/management')} `}>
                  
                <Image src="/icons/role.svg" width={24} height={24} alt="icons"/>
                <p className="text-sm">Operator</p>
              </Link>
              
              <Link 
                href="/admin/addUser" 
                className={`flex items-center gap-3 px-5 py-2 hover:text-emerald-300 hover:bg-gray-700/50 hover:fill-emerald-300 ${isActive('/admin/addUser')}`}>
                  <Image src="/icons/user.svg" width={24} height={24} alt="icon sidebar"  />
                  <p className="text-sm">Add User</p>
                </Link>
            </div>
            
            
          ) : (
            
            <div className="flex flex-col py-6 h-screen justify-between">
              <div className="mx-4 flex flex-col gap-4">
                {/* <Link href={token ? `/audio/create` : '/sign-in'}  className="flex items-center gap-3 px-5 py-4 rounded  bg-primary w-full">
                    <Image src="/icons/megaphone.svg" width={24} height={24} alt="icon sidebar" className="text-white" />
                    <p className="text-sm">Buat Audio</p>
                </Link> */}

                
                <Search />
                
                <Link href="/" className={`flex items-center gap-3 px-5 py-2  ${isActive('/')}`}>
                  <Image src="/icons/home.svg" width={24} height={24} alt="icons" className='fill-white'/>
                  <p className="text-sm">Beranda</p>
                </Link>
                
                
                {(role === "admin") && (
                  <Link href="/admin/management" className={`flex items-center gap-3 px-5 hover:bg-gray-700/50 py-2 ${isActive('/admin/management')}`}>
                    <Image src="/icons/role.svg" width={24} height={24} alt="icons"/>
                    <p className="text-sm">Operator</p>
                  </Link>
                )}
              </div>
              {/* <Link href={token ? `/profile/${(token as { id: string })?.id}` : '/sign-in'}  className={`flex items-center gap-3 px-5 py-2 ${isActive('/profile')}`}>
                <svg className={`text-white fill-current border-none ${isActive('/profile')}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                <p className="text-sm">Profile</p>
              </Link> */}
             
              <div className="px-5">
                {token ? (
                  <Quickstats name={name} role={role} image={image} total={total} token={token}/>
                ) : (
                  <Button asChild className="rounded-full bg-primary w-full">
                    <Link href="/sign-in">Masuk</Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
      
    </>
  )
}
