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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FileText, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AudioForm from "./AudioForm";
import { PdfViewerModal } from "./PdfViewerModal";

  


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
                toast({ title: "Audio berhasil dihapus", variant: 'success' })
            }

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

//    const isOwner = token === (userid?._id?.toString());
    const isOwner = token === userid;

  return (
    <div className="flex items-center gap-2">
      <Button className="max-w-sm bg-primary rounded-3xl w-full py-3" onClick={handleClick}>
        Mainkan
      </Button>
      <div className="flex gap-3">
        {userid && (
          <>
            {/* Mengganti Link dengan Dialog untuk Edit */}
            <Dialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Image
                        src="/icons/edit.svg"
                        width={64}
                        height={64}
                        alt="edit"
                        className="cursor-pointer"
                      />
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                    <p className="text-black">Edit Music</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent className="glass border-border/40 overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>Edit Audio</DialogTitle>
                  <DialogDescription>
                    Anda dapat mengubah judul, deskripsi, dan model suara.
                  </DialogDescription>
                </DialogHeader>
                {/* Meletakkan AudioForm di sini */}
                <AudioForm type="update" audioSlug={audio.slug} userid={userid} />
              </DialogContent>
            </Dialog>

            {/* Dialog untuk Hapus (kode yang sudah ada) */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image
                        src="/icons/delete.svg"
                        width={64}
                        height={64}
                        alt="delete"
                        className="cursor-pointer"
                      />
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
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p className="text-black">Hapus Music</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </>
        )}
          <TooltipProvider>
              <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/soal.pdf" target="_blank" rel="noopener noreferrer">
                      <Image
                        src="/icons/FileText.svg"
                        width={64}
                        height={64}
                        alt="pdf"
                        className="cursor-pointer"
                      />
                    </Link>
          
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                      <p className="text-black">Soal (PDF)</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
      </div>
    </div>
  )
}
