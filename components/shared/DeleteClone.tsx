'use client'

import { Badge, badgeVariants } from "@/components/ui/badge"
import { deleteCloneAudio } from "@/lib/actions/cloneAudio.action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DeleteClone({ voiceId, voiceUrl }: { voiceId: string; voiceUrl: string }) {

    const router = useRouter()

    const handleDeleteClone = async () => {

        const isConfirmed = confirm("Apakah anda yakin akan menghapus audio ini?")

        try {
            if(isConfirmed) {

                const deleteVoice = await deleteCloneAudio({voiceUrl, voiceId})
                if(deleteVoice) {
                    router.push('/admin/voice_clone_list')
                }
            }
        } catch(error) {
            console.error(error)
        }
    }

  return (
    <Badge variant="destructive" onClick={handleDeleteClone}>Hapus</Badge>

  )
}
