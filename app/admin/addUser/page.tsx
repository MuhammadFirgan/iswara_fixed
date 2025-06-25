'use client'

import CustomAlert from "@/components/shared/CustomAlert"
import CustomForm, { FieldType } from "@/components/shared/CustomForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { getRole } from "@/lib/actions/role.action"
import { createUser, getUserExist } from "@/lib/actions/user.action"

import { userFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



export default function page() {
    const [ roles, setRoles ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ status, setStatus ] = useState(0)

    const router = useRouter()

    useEffect(() => {
        const setRole = async () => {
            const response = await getRole()
            const data = response?.data
            setRoles(data)
        }

        setRole()
    }, [])

    const form = useForm<z.infer<typeof userFormValidation>>({
        resolver: zodResolver(userFormValidation),
        defaultValues: {
            ...userFormValidation,
            fullName: '',
            email: '',
            nip: '',
            role: '',
            password: ''
        },
    })
    
    async function onSubmit(values: z.infer<typeof userFormValidation>) {
        try {

            const initialUser = await getUserExist(values.nip, values.email)
            
            if(initialUser) {
                setMessage("Data User Telah Digunakan")
                setStatus(500)
            }
            
            const newUser = await createUser(values)

            if (newUser) {
                form.reset()
                router.push('/admin/management')
            }
            
        } catch (error) {
            console.log(error)
        }
  
    }
  return (
    <section className="p-10 overflow-hidden w-full">
        {message && <CustomAlert message={message} status={status} />}
        <h1 className="text-xl mb-10">Tambah User Baru</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="flex flex-col w-full sm:flex-row gap-5">
                    <div className="flex-1">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="fullName"
                            label="Nama Lengkap"
                            placeholder="Nama Lengkap.."
                        />
                    </div>
                    <div className="flex-1">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="email"
                            label="Email"
                            placeholder="Email.."
                        />
                    </div>
                    
                    
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.INPUT}
                            name="nip"
                            label="NIP"
                            placeholder="NIP..."
                        />
                    </div>
                    <div className="flex-1">
                        <CustomForm 
                            control={form.control}
                            type={FieldType.SELECT}
                            name="role"
                            label="Status"
                            placeholder="Pilih status"
                        >
                            {roles?.map((role: any) => (

                                <SelectItem key={role?._id} value={role?._id} className="bg-zinc-900 border-none text-white">{role?.name === 'admin' ? 'Operator' : 'Guru'}</SelectItem>
                            ))}
                        
                        </CustomForm>
                    </div>
                    
                </div>
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
    </section>
  )
}
