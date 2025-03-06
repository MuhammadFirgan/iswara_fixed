'use client'

import CloneAudio from "@/components/shared/CloneAudio"
import CustomForm, { FieldType } from "@/components/shared/CustomForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { createAudio } from "@/lib/actions/audio.action"
import { createFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IClone } from "@/lib/database/models/clone.model"
import { getCloneAudio } from "@/lib/actions/cloneAudio.action"
import FileUpload from "../../../../components/shared/FileUpload"
import { useRouter } from 'next/navigation'


export default function page() {

    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ cloneVoices, setCloneVoices ] = useState<IClone[]>([])
    
    const router = useRouter()

    const form = useForm<z.infer<typeof createFormValidation>>({
            resolver: zodResolver(createFormValidation),
            defaultValues: {
                ...createFormValidation,
                title: '',
                description: '',
                voicePrompt: ''
               
            },
        })
        
        async function onSubmit(values: z.infer<typeof createFormValidation>) {

            try {
                const newAudio = await createAudio(values)

                if(newAudio) {
                    router.push('/')
                }
            } catch(e) {
                console.error(e)
            }
           
        }

    const getVoices = async () => {
        const voiceList = await getCloneAudio()

        setCloneVoices(voiceList)
        
        
    }
    useEffect(() => {

        getVoices()
    }, [])

  return (
    <section className="px-10 pb-10 sm:max-w-3xl mt-32">
        <h1 className="text-xl mb-10">Buat Audio Anda</h1>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomForm 
                    control={form.control}
                    type={FieldType.INPUT}
                    name="title"
                    label="Judul Audio"
                    placeholder="Judul Audio..."
                />
                <CustomForm 
                    control={form.control}
                    type={FieldType.TEXTAREA}
                    name="description"
                    label="Deskripsi"
                    placeholder="Masukkan Deskripsi.."
                />
                <CustomForm 
                    control={form.control}
                    type={FieldType.TEXTAREA}
                    name="voicePrompt"
                    label="Text Bacaan"
                    placeholder="Masukkan Text Bacaan..."
                    
                />
            
                
                <CustomForm 
                    control={form.control}
                    type={FieldType.SELECT}
                    name="cloneAudio"
                    label="Tipe suara"
                    placeholder="Pilih tipe suara..."
                >
                    {cloneVoices?.map((cloneVoice: IClone) => (

                        <SelectItem key={cloneVoice?.id} value={cloneVoice?.fileUrl} className="bg-zinc-900 border-none text-white">{cloneVoice?.name}</SelectItem>
                        
                    ))}
                    <Button onClick={() => setIsModalOpen(true)} className="w-full">Tambah suara tiruan</Button>
                    
                </CustomForm>
                <CloneAudio isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                
                {/* <FileUpload onFileUpload={(fileUrl) => form.setValue('thumbnail', fileUrl)}/> */}

    
                <Button type="submit" className="bg-primary w-full">
                    {isSubmiting ? (
                        <>
                            memproses
                            <Loader size={20} className="animate-spin ml-2" />
                        </>
                    ) : (
                        <>
                            Kirim
                        </>
                    )}
                </Button>
            </form>
        </Form>
    </section>
  )
}
