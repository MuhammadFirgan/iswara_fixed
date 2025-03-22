import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { useCallback, useState } from 'react'
import { useDropzone } from "@uploadthing/react";
import Image from "next/image";
import { Loader } from "lucide-react";

interface UploadFileProps {
  onFieldChange: (fileUrl: String) => void
}

export default function FileUpload({ onFieldChange }: UploadFileProps) {
  const [ files, setFiles ] = useState<File[]>([])
  const [ preview, setPreview ] = useState<string>("")
  const { startUpload, isUploading } = useUploadThing('imageUploader')

  const onDrop = useCallback( async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)

    // const previewImage = acceptedFiles.map((file) => URL.createObjectURL(file))
    // setPreview(previewImage)

    try {

      const res = await startUpload(acceptedFiles)
      if(res && res?.length > 0) {
        setPreview(res[0].url)
        onFieldChange(res[0].url)
      }

      console.log(res)
    } catch(e) {
      console.error(e)
    }
  }, [startUpload, onFieldChange])

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <>    
      <div
        {...getRootProps()}
        className="justify-center items-center bg-neutral-900 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 text-center">
        <input {...getInputProps()} className="cursor-pointer" required />

        <div className="flex justify-center items-center flex-col py-5 text-grey-500 fill-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="77" height="77" viewBox="0 0 24 24" fill="currentColor"><path d="M11 15h2V9h3l-4-5-4 5h3z"></path><path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path></svg>
          <div>
            <h3 className="mb-2 mt-2">Upload Cover</h3>
            <p className="text-sm mb-4">SVG, PNG, JPG</p>
          </div>
          <Button type="button" className="rounded-full">
            Select from computer
            
          </Button>
        </div>
      </div>
      {isUploading ? (
        <Loader className="animate-spin" size={40} />
      ) : preview && (
        <Image src={preview} alt="preview image upload" width={100} height={100} className="rounded w-32 h-32"/>
      )}
    </>
  )
}
