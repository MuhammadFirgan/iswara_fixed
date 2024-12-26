import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ListAudio() {
  return (
    <div className='w-full bg-neutral-900 px-8 py-6 flex flex-col gap-4 rounded-xl'>
      
      <div className='flex gap-3 items-center'>
        <Image src="/vertical.jpg" width={60} height={60} alt="thumbnail" className='aspect-square rounded-2xl' />
        <div className='flex flex-col gap-1'>
            <Link href="/audio/1">
                <h3 className="text-lg ">Text Cerita | Kisah Kancil dan Buaya</h3>
            </Link>
            <span className="line-clamp-1 text-xs text-zinc-400">1 jam 20 menit</span>
        </div>
      </div>
        <p className='line-clamp-2 text-sm text-zinc-400'>Suatu hari, Kancil ingin menyeberangi sungai penuh buaya. Dengan cerdiknya, ia berpura-pura membawa pesan dari Raja Hutan yang ingin menghitung jumlah buaya. Buaya-buaya diminta berbaris membentuk jembatan, dan Kancil melompati mereka sambil berpura-pura menghitung. Setelah sampai di seberang, Kancil tertawa dan mengatakan bahwa ia hanya ingin menyeberang, bukan menghitung. Buaya pun merasa tertipu, tetapi Kancil sudah aman di seberang.</p>
        <span className="text-sm text-zinc-500 block pt-5">20 November 2024</span>
    </div>
  )
}
