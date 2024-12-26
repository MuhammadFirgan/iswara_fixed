import Image from "next/image";
import { Button } from '@/components/ui/button';
import ListAudio from "@/components/shared/ListAudio";

export default function Album({ params }: { params: Promise<{ name: string }> }) {
    return (
      <section className="min-h-screen">
        <div className="relative h-96">
        
          <div className="absolute inset-0 bg-[url('/horizontal.jpg')] bg-cover bg-center blur-sm ">
          
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent bottom-0 -top-1/4 translate-y-10"></div>
  
          <div className="relative z-20 text-white p-4 ">
            <div className="flex flex-col items-center justify-center gap-5 lg:px-10">
              <div className="w-52 h-52 lg:w-80 lg:h-80">
                <Image src="/horizontal.jpg" width={100} height={100} alt="thumbnail" className="w-full aspect-square" />
              </div>
              <div className="text-center flex flex-col gap-4 items-center ">
                <h1 className="text-xl font-bold lg:text-4xl lg:max-w-xl">
                  Muhammad Firgan
                </h1>
                <span className="text-sm lg:text-zinc-600">100 Audios</span>
                <Button className="max-w-sm bg-primary rounded-3xl w-full">Mainkan</Button>
              </div>
            </div>
            <div className='mt-10 lg:px-10 flex flex-col gap-5'>
              <ListAudio />
              <ListAudio />
            </div>
          </div>
        </div>
  
  
      </section> 
    )
}