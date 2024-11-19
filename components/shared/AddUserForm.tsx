'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

import { SelectItem } from "@/components/ui/select"

import { useRouter } from "next/navigation"
import CustomForm, { FieldType } from "./CustomForm"
import { userFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/user.action"



type UserFormProps =  {
    roles: object

}

export default function AddUserForm({ roles }: UserFormProps) {

    const router = useRouter()

    const form = useForm<z.infer<typeof userFormValidation>>({
        resolver: zodResolver(userFormValidation),
        defaultValues: {
            ...userFormValidation,
            fullName: '',
            email: '',
            nip: ''
        },
    })
    
    async function onSubmit(values: z.infer<typeof userFormValidation>) {
        // console.log({...values})
        try {
            
            const newUser = await createUser({...values })

            if (newUser) {
                form.reset()
                router.push('/management')
            }
            
        } catch (error) {
            console.log(error)
        }
  
    }
  return (
    <Dialog >
        <DialogTrigger className="bg-primary px-6 py-2 rounded-xl">Tambah User</DialogTrigger>
        <DialogContent className="bg-zinc-950">
            <DialogHeader>
            <DialogTitle className="mb-8">Tambah User Baru</DialogTitle>
            <DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="fullName"
                            label="Nama Lengkap"
                            placeholder="Nama Lengkap.."
                        />
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="email"
                            label="Email"
                            placeholder="Email.."
                        />
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="nip"
                            label="NIP"
                            placeholder="NIP..."
                        />
                        <CustomForm 
                            control={form.control}
                            type={FieldType.SELECT}
                            name="role"
                            label="Status"
                            placeholder="Pilih status"
                        >
                            {roles?.map((role: string) => (

                                <SelectItem key={role?._id} value={role?._id} className="bg-zinc-900 border-none text-white">{role.name === 'admin' ? 'Operator' : 'Guru'}</SelectItem>
                            ))}
                        
                        </CustomForm>
                        <CustomForm 
                            control={form.control}
                            type={FieldType.PASSWORD}
                            name="password"
                            label="Password"
                            placeholder="password..."
                        />
                        <Button type="submit" className="bg-primary w-full">Kirim</Button>
                    </form>
                </Form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
