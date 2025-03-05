'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'


export default function LogoutButton() {

  const router = useRouter()

  const fetchData = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } 
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="cursor-pointer flex items-center gap-4 px-5" onClick={() => fetchData()}>
      <Image src="/icons/logout.svg" width={20} height={20} alt="icon"  />
      <span>Logout</span>
    </div>

  )
}
