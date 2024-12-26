'use client'

import CustomForm, { FieldType } from "@/components/shared/CustomForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { voiceTypes } from "@/constans"
import { createAudio } from "@/lib/actions/audio.action"
import { createFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


export default function page() {

    const [isSubmiting, setIsSubmiting] = useState(false)

    const form = useForm<z.infer<typeof createFormValidation>>({
            resolver: zodResolver(createFormValidation),
            defaultValues: {
                ...createFormValidation,
                title: '',
                description: '',
                prompt: ''
            },
        })
        
        async function onSubmit(values: z.infer<typeof createFormValidation>) {
            try {
                setIsSubmiting(true)
                const newAudio = await createAudio(values)
                setIsSubmiting(false)
            } catch (error) {
                console.log(error)
                setIsSubmiting(false)
            }
        }
  return (
    <section className="px-10 pb-10 sm:max-w-3xl">
        <h1 className="text-xl mb-10">Buat Audio </h1>
        
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
                    name="prompt"
                    label="Prompt"
                    placeholder="Masukkan Prompt..."
                />
                <CustomForm 
                    control={form.control}
                    type={FieldType.SELECT}
                    name="voiceType"
                    label="Tipe suara"
                    placeholder="Pilih tipe suara..."
                >
                    {voiceTypes?.map((voicetype: any) => (

                        <SelectItem key={voicetype?.id} value={voicetype?.voice} className="bg-zinc-900 border-none text-white">{voicetype?.as}</SelectItem>
                    ))}
                
                </CustomForm>
                
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
