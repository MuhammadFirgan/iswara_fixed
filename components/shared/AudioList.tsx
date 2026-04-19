'use client'
import { getAudios } from '@/lib/actions/audio.action'
import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { AudioProps } from '@/types'

export default function AudioList({ initialData, query }: { initialData: AudioProps[], query?: string }) {
    const [audios, setAudios] = useState(initialData)
    const [ page, setPage ] = useState(1)
    const [loading, setLoading] = useState(false)
    const loadingRef = useRef<HTMLDivElement | null>(null)



    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if(entries[0].isIntersecting && !loading) {
                    setLoading(true)
  
                    const nextData = await getAudios(query, page + 1)
                    if(nextData.length) {
                        setAudios((prev) => [...prev, ...nextData])
                        setPage((prev) => prev + 1)
                    }

                    setLoading(false)
                }
            },
            { threshold: 0.5 }
        )

        if (loadingRef.current) {
            observer.observe(loadingRef.current)
        }
        return () => {
            
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current)
            } 

                
        }
    }, [loading, page, query])

  return (
    <div className='w-full'>
        <div className="flex justify-center gap-4 sm:gap-5 flex-wrap pt-10 lg:min-h-screen min-w-full">
            {audios && audios.length > 0 ? (
                audios.map((audio)  => (
                <Card 
                    key={audio._id} 
                    image={audio.thumbnail && audio.thumbnail.trim() !== '' ? audio.thumbnail : '/profile.jpg'} 
                    title={audio.title} 
                    name={audio.author.fullName} 
                    profile={audio.author.photo || '/profile.jpg'} 
                    slug={audio.slug} 
                    nip={audio.author.nip} />
                ))
            ) : (
                <h5 className="text-xl text-center text-white">Belum Ada Music yang Tersedia, Jadilah yang Pertama</h5>
            )}
            
        </div>
        <div ref={loadingRef}></div>
    </div>
  )
}
