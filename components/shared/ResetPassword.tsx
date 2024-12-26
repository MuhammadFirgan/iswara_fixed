'use client'
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

import CustomForm, { FieldType } from "./CustomForm"
import { useForm } from "react-hook-form"
import { resetPasswordValidation } from "@/lib/validation"
import { useState } from "react"
import CustomAlert from "./CustomAlert"

export default function ResetPassword() {

  const [message, setMessage] = useState<string | null>()
  const [ status, setStatus ] = useState(0)

  const form = useForm<z.infer<typeof resetPasswordValidation>>({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: {
        ...resetPasswordValidation,
        newPassword: ''
        
    },
  })

  async function onSubmit(values: z.infer<typeof resetPasswordValidation>) {
    const response = await fetch('/api/auth/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values }),
    })

    const data = await response.json()

    if(response.ok) {
      form.reset()
      setMessage(data.message)
      setStatus(response.status)
    }
  }

  return (
    <div>
      {message && <CustomAlert message={message} status={status} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <CustomForm 
                control={form.control}
                type={FieldType.INPUT}
                name="newPassword"
                label="Password Baru"
                placeholder="Masukkan password baru..."
            />
            
            <CustomForm 
                control={form.control}
                type={FieldType.PASSWORD}
                name="repeatPassword"
                label="Ulangi password"
                placeholder="ulangi password..."
            />
            <Button type="submit" className="bg-primary w-full">Kirim</Button>
        </form>
    </Form>
    </div>
  )
}
