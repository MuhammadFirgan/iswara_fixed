'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Badge } from "@/components/ui/badge"  
import CustomForm, { FieldType } from "./CustomForm"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserValidation } from "@/lib/validation"
import { z } from "zod"
import { SelectItem } from "../ui/select"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { getRole } from "@/lib/actions/role.action"
import { updateUser } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"
import { updateUserProps } from '@/types';
import { useToast } from "@/hooks/use-toast"
import { Loader } from "lucide-react"

export default function EditModal({ user } : { user: updateUserProps}) {

    const router = useRouter()
     const [ roles, setRoles ] = useState([])
     const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
        const { toast } = useToast()
     useEffect(() => {
        const setRole = async () => {
            const response = await getRole()
            const data = response?.data
            setRoles(data)
        }

        setRole()
    }, [])
    const form = useForm<z.infer<typeof updateUserValidation>>({
        resolver: zodResolver(updateUserValidation),
        defaultValues: {
            ...updateUserValidation,
            fullName: "",
            email: "",
            nip: "",
            role: ""
        },
    })

    useEffect(() => {
        if (user) {
            form.reset({
                fullName: user.fullName,
                email: user.email,
                nip: user.nip,
                role: user.role._id 
            })
        }
    }, [user, form])

    async function onSubmit(values: z.infer<typeof updateUserValidation>) {
        setIsSubmiting(true)
        try {
            const updatedUser = await updateUser({ id: user._id, user: values })
            if(updatedUser) {
                router.push('/admin/management')
                router.refresh()
            }
            toast({ title: "Berhasil mengupdate data" })
        } catch(e) {
            console.error(e)
        } finally {
            setIsSubmiting(false)
        }
      
    }
  return (
    <Dialog>
        <DialogTrigger>
            <Badge variant="warning">Ubah</Badge>
        </DialogTrigger>
        <DialogContent className="bg-neutral-950 border-none">
            <DialogHeader>
                <DialogTitle className="text-xl mb-2">Ubah User</DialogTitle>
                <DialogDescription className="sr-only">
                Formulir untuk mengubah data pengguna.
                </DialogDescription>
            </DialogHeader>
            <>
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
                            label="Nip"
                            placeholder="Nip.."
                        />
                        
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
            
        </DialogContent>
    </Dialog>
  )
}
