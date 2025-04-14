import Card from "@/components/shared/Card";
import { getAudios } from "@/lib/actions/audio.action";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default async function page({ searchParams }: SearchParamProps) {

  const query = (searchParams.query as string) || ''

  const audios = await getAudios(query || undefined)


  
  return (
    
    <section className="flex flex-col lg:flex-row w-full mt-28 overflow-hidden">
      <div className="flex flex-col items-center w-full sm:max-w-2xl sm:mx-8">
        <div className="w-full px-4 bg-primary rounded max-w-[400px] sm:max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="py-10 text-xl">AI Bicara, Kamu Mendengar</h1>
          <Image src="/AI.png" width={50} height={50} alt="AI image" className="w-32" />
        </div>
        <div className="flex justify-center gap-4 sm:gap-5 sm:justify-normal flex-wrap pt-10 lg:min-h-screen ">
          {audios && audios.length > 0 ? (
            audios.map((audio: any)  => (
              <Card key={audio._id} image={audio.thumbnail} title={audio.title} name={audio.author.fullName} profile={audio.author.photo} slug={audio.slug} nip={audio.author.nip} key={audio._id}/>
            ))
          ) : (
            <h5 className="text-xl text-center text-white">Belum Ada Music yang Tersedia, Jadilah yang Pertama</h5>
          )}
          
        </div>
      </div>
      <div className="lg:fixed lg:right-0 lg:bottom-0 lg:top-10 lg:min-h-screen lg:w-[350px] lg:bg-neutral-900 px-4 py-8">
      {/* <div className="px-4 py-8 sm:min-h-screen sm:w-[350px] sm:bg-neutral-900 rounded mr-5"> */}
        <h1 className="mb-4">Trending</h1>
        <Link href={`/audio/${audios[0].slug}`}>
          <Image src={audios[0].thumbnail} width={200} height={200} alt="trending" className="w-full rounded"/>
          <h3 className="line-clamp-2 pt-4 text-sm font-bold ">{audios[0].title}</h3>
        </Link>

        {audios.slice(1).map((audio: any) => (
          <Link href={`/audio/${audio.slug}`} className="flex items-center mt-8 gap-3" key={audio._id}>
            <Image src={audio.thumbnail} width={200} height={200} alt="trending" className="w-12 h-12 rounded"/>
            <h3 className="line-clamp-2 text-sm font-bold">{audio.title}</h3>

          </Link>
        ))}

      
      </div>
    </section>
  )
}
