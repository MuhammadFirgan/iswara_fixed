'use client'
import { useState } from "react";
// import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation'
import { Loader } from "lucide-react";


export default function LogoutButton() {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ isError, setIsError ] = useState<string | null>(null)
  const router = useRouter()


  const fetchData = async () => {
    setIsLoading(true)
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token') 
      sessionStorage.removeItem('token')
    }

  
    
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error("Gagal logout")
      } 
      router.push('/')
      router.refresh()
    } catch (error: any) {
      setIsError(error.message || "Gagal Logout, Coba Lagi")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    // <div className="cursor-pointer flex items-center gap-4 px-5 w-full text-gray-400 hover:text-red-400 hover:bg-red-900/20 text-sm" onClick={() => fetchData()}>
    //   <Image src="/icons/logout.svg" width={20} height={20} alt="icon"  />
    //   <span>Logout</span>
    // </div>
    <Button 
      variant="ghost"
      className="w-full bg-red-500 hover:bg-red-900/20 text-sm"
      size="sm"
      onClick={() => fetchData()}
      disabled={isLoading}
    >
      {/* <Image src="/icons/logout.svg" width={20} height={20} alt="icon" /> */}
      {isLoading ? (
        <div className="flex gap-3">
          <Loader size={20} className="animate-spin ml-2" />
          <span>Logout</span>
        </div>
      ) : (

        <span>Logout</span>
      )}
    </Button> 

  )
}




