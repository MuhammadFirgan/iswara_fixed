'use client'

import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { loginFormValidation } from "@/lib/validation"
import CustomForm, { FieldType } from "./CustomForm"
import { useForm } from "react-hook-form"

import CustomAlert from "./CustomAlert"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function LoginForm() {

    const [ isLoading, setIsLoading ] = useState(false)
    const [message, setMessage] = useState<string | null>()
    const [status, setStatus] = useState(0)

    const router = useRouter()


    const form = useForm<z.infer<typeof loginFormValidation>>({
        resolver: zodResolver(loginFormValidation),
        defaultValues: {
            ...loginFormValidation,
            nip: '',
            password: ''
            
        },
    })
    
    async function onSubmit(values: z.infer<typeof loginFormValidation>) {
       setIsLoading(true)
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values }),
        })
        const data = await response.json()

        if (response.ok) {
            router.push('/')
        } else {
            router.push('/sign-in')
            setMessage(data.message)
            setStatus(response.status)
        }

        setIsLoading(false)
    }

 return (
    <section className="flex flex-col gap-5 w-full sm:max-w-xs">
        {message && <CustomAlert message={message} status={status} />}
        <div className="bg-zinc-950 p-6">
            <h1 className="text-2xl text-center">Login <span className="text-primary">Iswara</span></h1>
            <span className="text-sm text-zinc-400 mt-3 mb-5 block text-center">Silahkan masuk</span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <CustomForm 
                        control={form.control}
                        type={FieldType.INPUT}
                        name="nip"
                        label="NIP"
                        placeholder="NIP..."
                    />
                    
                    <CustomForm 
                        control={form.control}
                        type={FieldType.PASSWORD}
                        name="password"
                        label="Password"
                        placeholder="password..."
                    />
                    <Button 
                            type="submit" 
                            className={`bg-primary w-full ${isLoading ? 'bg-green-300 hover:cursor-not-allowed text-black' : ''}`}
                            disabled={isLoading} 
                        >
                            {isLoading ? 'Memproses...' : 'Kirim'} 
                        </Button>
                </form>
            </Form>
            <Link href="/forgot_password" className="text-center text-sm block my-5 ">Lupa Password</Link>
        </div>
    </section>
  )
}
