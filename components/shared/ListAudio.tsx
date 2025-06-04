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
    <div className='w-full bg-neutral-900 px-8 py-6 flex flex-col gap-4 rounded-xl'>
      
      <div className='flex gap-3 items-center'>
        <Image src={thumbnail} width={60} height={60} alt="thumbnail" className='aspect-square rounded-2xl' />
        <div className='flex flex-col gap-1'>
            <Link href={`/audio/${slug}`}>
                <h3 className="text-lg ">{title}</h3>
            </Link>
            <span className="line-clamp-1 text-xs text-zinc-400">{formatTime(duration)}</span>
        </div>
      </div>
        <span className="text-sm text-zinc-500 block pt-5">20 November 2024</span>
    </div>
  )
}
