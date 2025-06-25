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
            const fetchData = async () => {
                const data = await getAudioBySlug(audioSlug)
                if(data) {
                    form.setValue("title", data.title)
                    form.setValue("description", data.description)
                    form.setValue("gender", data.tts_model)
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
            description: '',
            gender: ''
            
        },
    })
        
    async function onSubmit(values: z.infer<typeof createFormValidation>) {
        setIsSubmiting(true)
    

        if(type === "create") {
            try {

                const newAudio = await createAudio({
                    audio: {...values},
                    
                })
                if(newAudio) {
                    router.push('/')
                }

                toast({ title: "Berhasil membuat audio", variant: 'success' })
           
            } catch(e: any) {
                console.error(e)
                // setIsError('Gagal Membuat Musik')
                toast({ title: "Gagal membuat audio", variant: "destructive" })
                
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
                    audio: {...values},
                    audioSlug
                })

                if (updatedAudio) {
                    router.push('/')
                }
                
                toast({ title: "Berhasil mengupdate data" })
            } catch(e: any) {
                console.error('error : ', e)
                toast({ title: "Gagal mengupdate data", variant: "destructive" })
            } finally {
                setIsSubmiting(false)
            }
        }
        
        
    }
  return (
    <> 
        {/* {isError && (
            <div className="absolute bottom-0 right-0 bg-red-500 text-white">{isError}</div>
        )} */}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomForm 
                    control={form.control}
                    type={FieldType.INPUT}
                    name="title"
                    label="Judul Audio"
                    placeholder="Masukkan Judul Audio..."
                />
                <CustomForm 
                    control={form.control}
                    type={FieldType.TEXTAREA}
                    name="description"
                    label="Narasi text"
                    placeholder="Masukkan text.."
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
                                <FileUpload value={field.value} onFieldChange={field.onChange}/>
                            <FormMessage className="text-sm text-red-500"/>
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


    </>
  )
}


