'use client'
import CustomForm, { FieldType } from "@/components/shared/CustomForm"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { createAudio } from "@/lib/actions/audio.action"
import { createFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import CloneAudio from "@/components/shared/CloneAudio"
import FileUpload from "@/components/shared/FileUpload"
import GenderOptions from "./GenderOptions"
import GenerateMusic from "./GenerateMusic"

export default function AudioForm({ userid }: { userid: string }) {


    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    

    // fetch data dari getMusic, masukkan datanya ke db
    
    
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

        try {
            const newAudio = await createAudio({
                audio: {...values},
                userid
            })

            console.log(newAudio)


            if(newAudio) {
                router.push('/')
            }

           
        } catch(e) {
            console.error(e)
        } finally {
            setIsSubmiting(false)
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
            />
            
        

            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <GenderOptions onChangeHandler={field.onChange} value={field.value} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* <Button className="bg-primary">Buat lagu</Button>
            <audio controls>
                <source src="coba.mp3" type="audio/mpeg" />
            </audio>
            <GenerateMusic /> */}
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
                        Kirim
                    </>
                )}
            </Button>
        </form>
    </Form>
  )
}
