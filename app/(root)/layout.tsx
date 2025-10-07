
import MobileNav from "@/components/shared/MobileNav";
import Navbar from "@/components/shared/Navbar";
import PodcastPlayer from "@/components/shared/PodcastPlayer";
import Search from "@/components/shared/SearchInput";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { Toaster } from "@/components/ui/toaster";
import { getToken } from "@/constans/getToken";
import { getAudioByAuthor } from "@/lib/actions/audio.action";
import { dbConnect } from "@/lib/database";
import User from "@/lib/database/models/user.model";






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
    <main>
        <Navbar 
          name={name} 
          image={image} 
          token={tokenData} 
          role={roleName} 
        />
        <section className=''>
          {children}
          
          <Toaster />
        </section>
      <PodcastPlayer />
    </main>
   
  )
}
