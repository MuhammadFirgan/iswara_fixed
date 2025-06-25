import { getAudios } from "@/lib/actions/audio.action"
import Image from "next/image"
import Link from "next/link"


export default async function Trending() {
    const audios = await getAudios()
    const randomIndex = audios ? Math.floor(Math.random() * audios.length) : 0;
  return (
    <div className="lg:fixed lg:right-0 lg:bottom-0 lg:top-0 lg:min-h-screen lg:w-[300px] lg:bg-black px-4 py-8 lg:h-screen sm:overflow-y-auto sm:no-scrollbar ">
      {/* <div className="px-4 py-8 sm:min-h-screen sm:w-[350px] sm:bg-neutral-900 rounded mr-5"> */}
        <h1 className="mb-4">Trending</h1>
        { audios && audios.length > 0 && (
          <Link href={`/audio/${audios[randomIndex].slug}`}>
            <Image src={audios[randomIndex].thumbnail || ""} width={200} height={200} alt="trending" className="w-full h-56 rounded"/>
            <h3 className="line-clamp-2 pt-4 text-base font-bold ">{audios[randomIndex].title}</h3>
            <span className="text-xs text-gray-500">{audios[randomIndex].author.fullName}</span>
          </Link>
        ) }

        {audios
          .slice(1)
          .sort(() => Math.random() - 0.5) 
          .slice(0, 4)
          .map((audio: any) => (
          <Link href={`/audio/${audio.slug}`} className="flex items-center mt-8 gap-3" key={audio._id}>
            <Image src={audio.thumbnail} width={200} height={200} alt="trending" className="w-12 h-12 rounded"/>
            <div className="flex flex-col">
              <h3 className="line-clamp-2 text-base font-bold">{audio.title}</h3>
              <span className="text-xs text-gray-500">{audio.author.fullName}</span>
            </div>
          </Link>
        ))}

      
      </div>
  )
}
