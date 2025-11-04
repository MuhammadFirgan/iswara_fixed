import { CustomSkeleton } from "@/components/shared/CustomSkeleton"
import Navbar from "@/components/shared/Navbar"
import PodcastPlayer from "@/components/shared/PodcastPlayer"
import Trending from "@/components/shared/Trending"
import { Toaster } from "@/components/ui/toaster"
import { getToken } from "@/constans/getToken"
import { getAudioByAuthor, getAudios } from "@/lib/actions/audio.action"
import { dbConnect } from "@/lib/database"
import User from "@/lib/database/models/user.model"
import { Suspense } from "react"


export default async function layout({children}: {children: React.ReactNode}) {
    const audios = await getAudios(undefined)  
  return (
    <main>
      <section className="w-full lg:container px-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {children}
        </div>
          {audios && audios.length > 0 ? (
          <Suspense fallback={<CustomSkeleton />}>
              <Trending />
          </Suspense>
          ) : null}
          <Toaster />
      </section>
    
    </main>
  )
}
