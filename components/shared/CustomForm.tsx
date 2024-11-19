import {
    FormField,
    FormItem,
  } from "@/components/ui/form"

import { Control } from "react-hook-form"
import RenderField from "./RenderField"

export enum FieldType {
    INPUT = 'input',
    SELECT = 'select',
    FILE = 'file',
    TEXTAREA = 'textarea',
    PASSWORD = 'password'
}

export interface CustomFormProps {
    control: Control<any>
    type: FieldType
    name: string
    label?: string
    placeholder?: string
    children?: React.ReactNode
}


export default function CustomForm(props: CustomFormProps) {
    const { name, control } = props
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem>
            
            <RenderField field={field} props={props}/>
        </FormItem>
        )}
    />
  )
}
