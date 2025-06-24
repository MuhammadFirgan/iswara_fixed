import MobileNav from "@/components/shared/MobileNav";
import Search from "@/components/shared/Search";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { getToken } from "@/constans/getToken";
import { getAudioByAuthor } from "@/lib/actions/audio.action";
import { dbConnect } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Link from "next/link";



export default async function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const tokenData = await getToken()
    
    
    const role = tokenData?.role
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
    <main className="relative">
      <div className="flex relative">
        <div className='hidden lg:block relative '>
          <Sidebar 
            name={name} 
            image={image} 
            total={totalAudio.toString()} 
            token={tokenData} 
            role={role}  
            type="first"/>
        </div>
        <section className='flex min-h-screen max-md:pb-14 flex-col relative z-500 w-full'>
          <div className="flex w-full justify-between items-center gap-3 px-8 py-6">
            {/* <Search /> */}
            {/* <div >
            </div> */}
            <Link href="/" className="text-primary font-semibold text-2xl md:hidden"><span className="text-white">i</span>SWARA</Link>
            <div className="flex items-center gap-3 relative">
              <div className="md:hidden">
                <MobileNav 
                  name={name} 
                  image={image} 
                  total={totalAudio.toString()} 
                  token={tokenData} 
                  role={role}  
                  type="first"/>
              </div>
              {/* <Topbar /> */}
            </div>
          </div>

          {children}
         
        </section>
      </div>
    </main>
   
  )
}
