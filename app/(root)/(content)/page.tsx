import AudioList from "@/components/shared/AudioList";
import Card from "@/components/shared/Card";
import { CustomSkeleton } from "@/components/shared/CustomSkeleton";
import Trending from "@/components/shared/Trending";
import { getAudios } from "@/lib/actions/audio.action";
import { Sparkles } from "lucide-react";




export default async function Page() { 

  const audios = await getAudios()

  const query = ''
  
  return (
    <section className="w-full lg:w-[calc(100%-300px)] lg:container px-4 lg:py-8">

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold">Dengarkan AI Bercerita</h2>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <AudioList initialData={audios} query={query}/>
      </div>
    </section>
  )
}
