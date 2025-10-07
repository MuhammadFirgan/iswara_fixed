import { formatTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type ListAudioProps = {
  thumbnail: string
  slug: string
  title: string
  duration: number
}

export default function ListAudio({ thumbnail, slug, title, duration }: ListAudioProps) {
  return (
    <div className='w-full px-8 py-2 flex flex-col gap-4'>
      
      <div className='flex gap-3 items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Image src={thumbnail} width={60} height={60} alt="thumbnail" className='aspect-square rounded-2xl' />
          <div className='flex flex-col gap-1'>
            <Link href={`/audio/${slug}`}>
                <h3 className="text-lg ">{title}</h3>
            </Link>
            <span className="text-sm text-zinc-500 block ">20 November 2024</span>  
          </div>
        </div>
        <span className="line-clamp-1 text-xs text-zinc-400">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
