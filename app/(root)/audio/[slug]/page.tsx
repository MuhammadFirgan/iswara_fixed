import NotFound from "@/app/not-found";
import PhoneRinging from "@/components/shared/PhoneRinging";
import PodcastDetailPlayer from "@/components/shared/PodcastDetailPlayer";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getAudioBySlug, getAudioByAuthor } from "@/lib/actions/audio.action";
import Image from "next/image";
import Link from "next/link";



export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const audioBySlug = await getAudioBySlug(slug)

  const userNip = audioBySlug.author.nip

  const audioByAuthor = await getAudioByAuthor(userNip)

  if(!audioBySlug) {
    return <NotFound title="Audio Tidak Ditemukan"/>
  }

  const formatLyrics = (lyrics: string): string => {
    return lyrics.replace(/\n/g, "<br />");
  };

  return (
    <section className="relative mt-28">
      <div className="relative h-96 ">
      
       
        <Image
          src={audioBySlug.thumbnail} 
          alt="Cover"
          fill
          objectFit="cover" 
          className="absolute inset-0 blur-sm" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent bottom-0 -top-1/4 translate-y-10"></div>

        <div className="relative z-20 text-white p-4 flex flex-col items-center justify-center gap-5 lg:flex-row-reverse lg:justify-between lg:px-10 lg:items-end">
          <div className="w-52 h-52 lg:w-80 lg:h-80 ">
            <Image src={audioBySlug.thumbnail} width={100} height={100} alt="thumbnail" className="w-full aspect-square" />
          </div>
          <div className="text-center flex flex-col gap-4 items-center lg:text-left lg:items-start lg:gap-10">
            <h1 className="text-xl font-bold lg:text-4xl lg:max-w-xl">
              {audioBySlug.title}
            </h1>
            
            {/* <PhoneRinging name={audioBySlug.author.fullName} avatar={audioBySlug.author.photo} audio_url={audioBySlug.audio} /> */}
            <PodcastDetailPlayer audio={audioBySlug} userid={audioBySlug.author} />
          </div>
        </div>
      </div>


      <div className="px-10 flex flex-col gap-7 pt-10 lg:pb-10">
        {/* <p className="text-sm">{audioBySlug.lyrics}</p> */}
        <p
          className="text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: formatLyrics(audioBySlug.lyrics) }}
        />
        <div className="w-full px-5 py-3 bg-zinc-800 rounded-xl flex items-center gap-10 lg:max-w-md">
          <Image src={audioBySlug.author.photo} width={50} height={50} alt="profile" className="aspect-square rounded-lg" />
          <div>
            <Link href={`/profile/${audioBySlug.author._id}`}>      
              <h2 className="text-xl">{audioBySlug.author.fullName}</h2>
            </Link>
            <div className="flex items-center gap-2">
              <Image src="/icons/megaphone.svg" width={24} height={24} alt="audio" className="w-5 h-5" />
              
              <span className="text-sm text-zinc-600">{audioByAuthor.length} Audios</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
