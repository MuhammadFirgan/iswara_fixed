export const dynamic = "force-dynamic";


import AudioList from "@/components/shared/AudioList";
import Card from "@/components/shared/Card";
import { CustomSkeleton } from "@/components/shared/CustomSkeleton";
import Trending from "@/components/shared/Trending";
import { getAudios } from "@/lib/actions/audio.action";
// import { SearchParamProps } from "@/types";
import Image from "next/image";
import { Suspense } from "react";


export default async function page({ params }: { params: Promise<{ query: string }> }) {

  // const query = (searchParams?.query as string) || ''
  const { query } = await params

  const audios = await getAudios(query || undefined)  
  return (
    
    <section className="flex flex-col lg:flex-row w-full pt-5 overflow-hidden">
      <div className="flex flex-col items-center w-full sm:max-w-2xl sm:mx-8">
        <div className="w-full px-4 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border border-emerald-500/20 rounded max-w-[400px] sm:max-w-xl flex justify-between items-center">
          <h1 className="py-10 text-xl text-emerald-400">Dengarkan AI Bercerita</h1>
          <Image src="/AI.png" width={50} height={50} alt="AI image" className="w-32" />
        </div>
        
        <div className="flex flex-col">
          <div className="order-2 lg:order-1">
            <AudioList initialData={audios} query={query}/>
          </div>
          <div className="order-1 lg:order-2">
            {audios && audios.length > 0 ? (
              <Suspense fallback={<CustomSkeleton />}>
                <Trending />
              </Suspense>
            ) : null}
          </div>
      </div>

      </div>
      
    </section>
  )
}
