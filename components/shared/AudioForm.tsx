'use client'
import CustomForm, { FieldType } from "@/components/shared/CustomForm"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { createAudio, getAudioBySlug, updateAudio } from "@/lib/actions/audio.action"
import { createFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import FileUpload from "@/components/shared/FileUpload"
import GenderOptions from "./GenderOptions"
import { useToast } from "@/hooks/use-toast"


export default function AudioForm({ userid, type = "create", audioSlug }: { userid: string; type: 'create' | 'update', audioSlug?: string; }) {

    
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    const { toast } = useToast()

    useEffect(() => {
        if(type === "update" && audioSlug) {
            console.log(audioSlug, type)
            const fetchData = async () => {
                const data = await getAudioBySlug(audioSlug)
                if(data) {
                    form.setValue("title", data.title)
                    form.setValue("lyrics", data.lyrics)
                    form.setValue("gender", data.gender)
                }
            }

            fetchData()
        }
    }, [type, audioSlug])
 
    
    const router = useRouter()


    const form = useForm<z.infer<typeof createFormValidation>>({
        resolver: zodResolver(createFormValidation),
        defaultValues: {
            ...createFormValidation,
            title: '',
            lyrics: '',
            gender: ''
            
        },
    })
        
    async function onSubmit(values: z.infer<typeof createFormValidation>) {
        setIsSubmiting(true)
    


        if(type === "create") {
            try {

                const newAudio = await createAudio({
                    audio: {...values},
                    userid
                    
                })
                if(newAudio) {
                    router.push('/')
                }

                toast({ title: "Berhasil membuat musik" })
           
            } catch(e) {
                console.error(e)
                toast({ title: "Gagal membuat musik", variant: "destructive" })
            } finally {
                setIsSubmiting(false)
            }
            
        }
        if(type === "update") {
            if(!audioSlug) {
                router.back()
                return;
            }

            try {
                const updatedAudio = await updateAudio({
                    userid,
                    audio: {...values},
                    audioSlug
                })

                toast({ title: "Berhasil mengupdate musik" })
            } catch(e) {
                console.error(e)
                toast({ title: "Gagal membuat musik", variant: "destructive" })
            } finally {
                setIsSubmiting(false)
            }
        }
        
        
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomForm 
                control={form.control}
                type={FieldType.INPUT}
                name="title"
                label="Judul Musik"
                placeholder="Masukkan Judul Musik..."
            />
            <CustomForm 
                control={form.control}
                type={FieldType.TEXTAREA}
                name="lyrics"
                label="Lirik Lagu"
                placeholder="Masukkan Lirik.."
                disabled={type === "update"}
            />
            
            
            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <GenderOptions onChangeHandler={field.onChange} value={field.value} disabled={type === "update"}/>
                        </FormControl>

                        <FormMessage className="text-sm text-red-500"/>
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
            
            
            

            <Button type="submit" className={`bg-primary w-full ${isSubmiting ? 'bg-green-300 hover:cursor-not-allowed text-black' : ''}`} disabled={isSubmiting}>
                {isSubmiting ? (
                    <>
                        memproses
                        <Loader size={20} className="animate-spin ml-2" />
                    </>
                ) : (
                    <>
                        Simpan
                    </>
                )}
            </Button>
        </form>
    </Form>
  )
}


