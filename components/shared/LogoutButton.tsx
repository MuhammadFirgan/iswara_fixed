'use client'
import { useState } from "react";
import { Button } from "../ui/button"; // Asumsi ini aman
import { useRouter } from 'next/navigation'
import { Loader } from "lucide-react";


export default function LogoutButton() {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ isError, setIsError ] = useState<string | null>(null)
  const router = useRouter()


  const fetchData = async () => {
    setIsLoading(true)
    setIsError(null); // Reset error sebelum mencoba
    
    // Pastikan operasi Local Storage dilakukan di client
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('token'); 
        sessionStorage.removeItem('token');
        console.log("Token berhasil dihapus dari Local/Session Storage.");
      } catch (e) {
        // Tangkap error jika browser memblokir akses ke LocalStorage
        console.error("Gagal menghapus token dari storage:", e);
      }
    } else {
        // Ini adalah case SSR/Server
        console.log("Mencoba logout, tetapi bukan di lingkungan browser (SSR).");
    }

    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        // Lempar error untuk ditangkap di blok catch
        throw new Error("Gagal logout. Server merespon dengan status: " + response.status);
      } 
      
      // Sukses
      router.push('/')
      router.refresh()

    } catch (error: any) {
      // Menangkap error dari fetch atau throw baru
      console.error("Logout Error:", error);
      setIsError(error.message || "Gagal Logout, Coba Lagi")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    // ... (Sama seperti sebelumnya)
    <Button 
      variant="ghost"
      className="w-full bg-red-500 hover:bg-red-900/20 text-sm"
      size="sm"
      onClick={fetchData} // Langsung gunakan fetchData
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex gap-3">
          <Loader size={20} className="animate-spin ml-2" />
          <span>Logout...</span>
        </div>
      ) : (
        <>
          {isError && <span className="text-yellow-300 mr-2">{isError}</span>}
          <span>Logout</span>
        </>
      )}
    </Button> 

  )
}