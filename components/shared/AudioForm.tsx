'use client'
import CustomForm, { FieldType } from "@/components/shared/CustomForm"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

// import { createAudio } from "@/lib/actions/audio.action"
import { createFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import CloneAudio from "@/components/shared/CloneAudio"
import FileUpload from "@/components/shared/FileUpload"

export default function AudioForm({ userid }: { userid: string }) {


    const [isSubmiting, setIsSubmiting] = useState(false)
    
    
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
            // const newAudio = await createAudio({
            //     audio: {...values},
            //     userid
            // })

            // console.log(newAudio)

            // if(newAudio) {
            //     router.push('/')
            // }

            console.log("ok")
        } catch(e) {
            console.error(e)
        }
        
    }
  return (
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
        

            <FormField
                control={form.control}
                name="cloneAudio"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <CloneAudio onChangeHandler={field.onChange} value={field.value} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        </FormControl>
                            <FileUpload onFieldChange={field.onChange}/>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            
            

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
  )
}
