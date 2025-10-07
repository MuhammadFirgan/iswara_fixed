export const dynamic = "force-dynamic";

import AudioList from "@/components/shared/AudioList";
import Card from "@/components/shared/Card";
import { CustomSkeleton } from "@/components/shared/CustomSkeleton";
import Trending from "@/components/shared/Trending";
import { getAudios } from "@/lib/actions/audio.action";
import { Sparkles } from "lucide-react";
// import { SearchParamProps } from "@/types";
import Image from "next/image";
import { Suspense } from "react";


export default async function page({ searchParams }: { searchParams: { query?: string } }) {

  const query = (await searchParams)?.query || ''; 
 
  const audios = await getAudios(query || undefined)  
  // console.log("audios : ", audios)
  return (
    
    // <section className="flex flex-col lg:flex-row w-full pt-5 overflow-hidden">
    <section className="w-full lg:w-[calc(100%-300px)] lg:container px-4 lg:py-8">

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold">Dengarkan AI Bercerita</h2>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <AudioList initialData={audios} query={query}/>
      </div>
      {/* {audios && audios.length > 0 ? (
        <Suspense fallback={<CustomSkeleton />}>
          <Trending />
        </Suspense>
      ) : null} */}
      
      
      
    </section>
  )
}
