
import MobileNav from "@/components/shared/MobileNav";
import PodcastPlayer from "@/components/shared/PodcastPlayer";
import Search from "@/components/shared/Search";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { Toaster } from "@/components/ui/toaster";
import { getToken } from "@/constans/getToken";
import { getAudioByAuthor } from "@/lib/actions/audio.action";
import { dbConnect } from "@/lib/database";
import User from "@/lib/database/models/user.model";



export type barProps = {
  name: string
  total: string
  image: string
  role: string
  token: object | string
  type: 'first' | 'second'
}


export default async function layout({
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    const tokenData = await getToken()

    const roleName = tokenData?.role
    const userId = tokenData?.id

    let name = ""
    let totalAudio = 0
    let image = ""

    try {

      await dbConnect()
      const userData = await User.findById(userId).select("fullName nip photo")


      const audioList = await getAudioByAuthor(userData?.nip)


      name = userData?.fullName
      totalAudio = audioList.length 
      image = userData?.photo
    } catch (error) {
      console.error(error)
    }

    

  return (
    <main className="">
      <div className="flex">
        <div className='hidden md:block fixed left-0 bottom-0 min-h-screen z-[9999]'>
          <Sidebar 
            name={name} 
            image={image} 
            total={totalAudio.toString()} 
            token={tokenData} 
            role={roleName} 
            type="second"/>
        </div>
        <section className='flex min-h-screen flex-col relative w-full sm:ml-[280px]'>
          <div className="md:hidden flex justify-between items-center p-4">
            <h1>iSWARA</h1>
            <MobileNav 
              name={name} 
              image={image} 
              total={totalAudio.toString()} 
              token={tokenData} 
              role={roleName} 
              type="second"/>
          </div>
          {children}
          
          <Toaster />
        </section>
      </div>
      <PodcastPlayer />
    </main>
   
  )
}
