import Image from "next/image";
import { Button } from '@/components/ui/button';
import ListAudio from "@/components/shared/ListAudio";
import { getAudioByAuthor, getAudios } from "@/lib/actions/audio.action";
import { Suspense } from "react";
import { CustomSkeleton } from "@/components/shared/CustomSkeleton";
import Trending from "@/components/shared/Trending";
import AudioList from "@/components/shared/AudioList";

export default async function Album({ params }: { params: Promise<{ nip: string }> }) {

  const { nip } = await params

  const audiosByAuthor = await getAudioByAuthor(nip)
  const audios = await getAudios(undefined)

  
  
    return (
      <section className="lg:w-[calc(100%-300px)] mt-12 px-4 relative">
        <div className="flex flex-col">

          <div className="mb-6 flex flex-col md:flex-row">
            <div className="flex items-start justify-start mb-4 relative glass p-7 flex-col gap-7 md:w-1/2">
              <div className="w-24 h-24">
                <Image src={audiosByAuthor[0].author.photo || '/profile.jpg'} width={100} height={100} alt="thumbnail" className="w-full aspect-square rounded-lg shadow-2xl shadow-black" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                  Album {audiosByAuthor[0].author.fullName}
                </h1>
                <span className="text-sm lg:text-zinc-600">{audiosByAuthor.length} Audio</span>
        
              </div>
              
            </div>
            <div className="md:w-1/2 max-h-56 overflow-y-auto">
              {audiosByAuthor.map((audio: any) => (
                <ListAudio
                  key={audio.slug}
                  thumbnail={audio.thumbnail}
                  slug={audio.slug}
                  title={audio.title}
                  duration={audio.duration}
                />
              ))}
              
            </div>
          </div>
        </div>
        <div className="w-full flex-col lg:flex-row gap-6 hidden md:flex">

          <AudioList initialData={audios} />
        </div>

  
  
      </section> 
    )
}