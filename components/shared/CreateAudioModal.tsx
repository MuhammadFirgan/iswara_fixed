import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Upload } from 'lucide-react'
import AudioForm from './AudioForm'

export default function CreateAudioModal(token: string) {
  // @ts-ignore
 const userid = token?.id as string
  return (
    <DialogContent className="glass border-border/40 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
              <Upload className="w-6 h-6 text-accent" />
              Tambahkan Audio Baru
          </DialogTitle>
          <DialogDescription>
              Isi form dibawah ini untuk menambahkan audio baru
          </DialogDescription>
        </DialogHeader>
        <AudioForm userid={userid} type="create" />
    </DialogContent>
  )
}
