'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { audioProps } from "@/types";
import { useAudio } from "@/providers/AudioProvider";
import { useEffect, useState } from "react";
import { getToken } from "@/constans/getToken";
import { deleteAudio } from "@/lib/actions/audio.action";
import { useRouter } from "next/navigation";
  


export default function PodcastDetailPlayer({ userid, audio }: audioProps) {

    const [ token, setToken ] = useState<string | null>(null)

    const { setAudio } = useAudio()

    const router = useRouter()

    const handleClick = () => {
        setAudio({
            title: audio.title,
            slug: audio?.slug,
            url: audio?.audio,
            thumbnail: audio?.thumbnail,
            author: audio?.author.fullName,
            duration: audio?.duration 
        })
    }

    const handleDelete = async (slug: string) => {
        
        const deletedAudio = await deleteAudio(slug)

        if(deletedAudio) {
            router.push("/")
        }
        
    }

   useEffect(() => {
    const userToken = async () => {
        const token = await getToken()
        const tokenid = token.id
        setToken(tokenid)
    }

    userToken()
   }, [])

  return (
    <div className="flex items-center gap-2">
        <Button className="max-w-sm bg-primary rounded-3xl w-full py-3" onClick={handleClick}>Mainkan</Button>
        <div className="flex gap-3">
            {token === userid._id as string  && (
                <>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={`/audio/${audio.slug}/edit`}>
                                    <Image src="/icons/edit.svg" width={64} height={64} alt="edit"/>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white">
                            <p className="text-black">Edit Music</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div onClick={() => handleDelete(audio.slug)}>
                                    <Image src="/icons/delete.svg" width={64} height={64} alt="delete"/>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white">
                            <p className="text-black">Hapus Music</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </>
            )}
            
            
            
        </div>
    </div>
  )
}
