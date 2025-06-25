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
import { Lock } from "lucide-react"

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

          <div className="p-8">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-3">
              <Lock className="w-6 h-6 text-green-500" />
              <span>Change Password</span>
            </h3>
            
            <div className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <div className="relative">
                  {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                  <CustomForm 
                    control={form.control}
                    type={FieldType.INPUT}
                    name="newPassword"
                    label="Password Baru"
                    placeholder="Masukkan password baru..."
                  />
                  <button
                    type="button"
                    
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {/* {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} */}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <div className="relative">
                  {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                  <CustomForm 
                    control={form.control}
                    type={FieldType.PASSWORD}
                    name="repeatPassword"
                    label="Ulangi password"
                    placeholder="ulangi password..."
                  />
                  <button
                    type="button"
                    
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {/* {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} */}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              
              
              <Button
                type="submit"
                className="w-full bg-primary text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {/* <Shield className="w-5 h-5" /> */}
                <span>Update Password</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
      

      
    </div>
    // <div>
    //   {message && <CustomAlert message={message} status={status} />}
    //   <Form {...form}>
    //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
    //         <CustomForm 
    //             control={form.control}
    //             type={FieldType.INPUT}
    //             name="newPassword"
    //             label="Password Baru"
    //             placeholder="Masukkan password baru..."
    //         />
            
    //         <CustomForm 
    //             control={form.control}
    //             type={FieldType.PASSWORD}
    //             name="repeatPassword"
    //             label="Ulangi password"
    //             placeholder="ulangi password..."
    //         />
    //         <Button type="submit" className="bg-primary w-full">Kirim</Button>
    //     </form>
    //   </Form>
    // </div>
  )
}
