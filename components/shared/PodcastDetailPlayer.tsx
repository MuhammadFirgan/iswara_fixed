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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

  


export default function PodcastDetailPlayer({ userid, audio }: audioProps) {
    const [ token, setToken ] = useState<string | null>(null)
    const [ isDeleting, setIsDeleting ] = useState<boolean>(false)

    const { setAudio } = useAudio()
    const { toast } = useToast()

    const router = useRouter()

    const handleClick = () => {
        setAudio({
            title: audio.title,
            slug: audio?.slug,
            url: audio?.url,
            thumbnail: audio?.thumbnail,
            author: audio?.author.fullName,
            duration: audio?.duration 
        })
    }

    const handleDelete = async (slug: string) => {
        setIsDeleting(true)

        try {
            const deletedAudio = await deleteAudio(slug)

            if(deletedAudio) {
                router.push("/")
                router.refresh()
            }

            toast({ title: "Audio berhasil dihapus", variant: 'success' })
        } catch(e) {
            console.error(e)
            toast({ title: "Audio gagal dihapus", variant: "destructive" })
        } finally {
            setIsDeleting(false)
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

   const isOwner = token === (userid?._id?.toString());

  return (
    <div className="flex items-center gap-2">
        <Button className="max-w-sm bg-primary rounded-3xl w-full py-3" onClick={handleClick}>Mainkan</Button>
        <div className="flex gap-3">
            {isOwner  && (
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
                                <Dialog>
                                    <DialogTrigger>
                                        <Image src="/icons/delete.svg" width={64} height={64} alt="delete"/>
                                    </DialogTrigger>
                                    <DialogContent className="bg-neutral-950">
                                        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                                        <DialogDescription>
                                        
                                            Apakah Anda yakin ingin menghapus audio ini?
                                        </DialogDescription>
                                        

                                        <div className="flex justify-end gap-3 mt-4">
                                            <DialogClose asChild>
                                                <Button variant="outline">Batal</Button>
                                            </DialogClose>
                                            <Button
                                                
                                                onClick={() => handleDelete(audio.slug)}
                                                className={`bg-red-500 hover:bg-red-400 ${isDeleting ? 'bg-red-300 hover:cursor-not-allowed text-black' : ''}`} 
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? (
                                                    <>
                                                        memproses
                                                        <Loader size={20} className="animate-spin ml-2" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Hapus
                                                    </>
                                                )}
                                           
                                            </Button>
                                            {/* <DialogClose asChild>
                                            </DialogClose> */}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                {/* <div onClick={() => handleDelete(audio.slug)}>
                                </div> */}

                                {/* <Dialog>
                                    <ContextMenu>
                                        <ContextMenuTrigger>Right click</ContextMenuTrigger>
                                        <ContextMenuContent>
                                        <ContextMenuItem>Open</ContextMenuItem>
                                        <ContextMenuItem>Download</ContextMenuItem>
                                        <DialogTrigger asChild>
                                            <ContextMenuItem>
                                            <span>Delete</span>
                                            </ContextMenuItem>
                                        </DialogTrigger>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                    <DialogContent>
                                        <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. Are you sure you want to permanently
                                            delete this file from our servers?
                                        </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                        <Button type="submit">Confirm</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog> */}

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
