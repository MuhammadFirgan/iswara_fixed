import PhoneRinging from "@/components/shared/PhoneRinging";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";



export default function page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <section className="relative">
      <div className="relative h-96 ">
      
        <div className="absolute inset-0 bg-[url('/horizontal.jpg')] bg-cover bg-center blur-sm ">
        
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent bottom-0 -top-1/4 translate-y-10"></div>

        <div className="relative z-20 text-white p-4 flex flex-col items-center justify-center gap-5 lg:flex-row-reverse lg:justify-between lg:px-10 lg:items-end">
          <div className="w-52 h-52 lg:w-80 lg:h-80">
            <Image src="/horizontal.jpg" width={100} height={100} alt="thumbnail" className="w-full aspect-square" />
          </div>
          <div className="text-center flex flex-col gap-4 items-center lg:text-left lg:items-start lg:gap-10">
            <h1 className="text-xl font-bold lg:text-4xl lg:max-w-xl">
              Teks Cerita | Kisah Kancil Dan Buaya
            </h1>
            
            <PhoneRinging name="Pak Jokowi" avatar="" />
          </div>
        </div>
      </div>


      <div className="px-10 flex flex-col gap-7 pt-10 lg:pb-10">
        <p className="text-sm ">Suatu hari, Kancil ingin menyeberangi sungai penuh buaya. Dengan cerdiknya, ia berpura-pura membawa pesan dari Raja Hutan yang ingin menghitung jumlah buaya. Buaya-buaya diminta berbaris membentuk jembatan, dan Kancil melompati mereka sambil berpura-pura menghitung. Setelah sampai di seberang, Kancil tertawa dan mengatakan bahwa ia hanya ingin menyeberang, bukan menghitung. Buaya pun merasa tertipu, tetapi Kancil sudah aman di seberang.</p>
        <div className="w-full px-5 py-3 bg-zinc-800 rounded-xl flex items-center gap-10 lg:max-w-md">
          <Image src="/vertical.jpg" width={50} height={50} alt="profile" className="aspect-square rounded-lg" />
          <div>
            <Link href="/profile">      
              <h2 className="text-xl">Muhammad Firgan</h2>
            </Link>
            <div className="flex items-center gap-2">
              <Image src="/icons/megaphone.svg" width={24} height={24} alt="audio" className="w-5 h-5" />
              
              <span className="text-sm text-zinc-600">100 Audios</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
