import {
    FormControl,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "../ui/input"
import { CustomFormProps, FieldType } from "./CustomForm"
import { Textarea } from "../ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
  

export default function RenderField({ field, props }: { field: any, props: CustomFormProps }) {

    switch (props.type) {
        case FieldType.INPUT:
            return (
                <>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input placeholder={props.placeholder} {...field} className="shad-input bg-zinc-900 border-none w-full" />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500"/>
                </>
            )
        case FieldType.PASSWORD:
            return (
                <>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Input placeholder={props.placeholder} {...field} className="shad-input bg-zinc-900 border-none" type="password" />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                </>
            )
        case FieldType.TEXTAREA:
            return (
                <>
                    
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={props.placeholder} {...field} className="shad-input bg-zinc-900 border-none w-full" disabled={props.disabled || false} />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                
                </>
                
            )

        case FieldType.SELECT:
            return (
                <>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="shad-select-trigger bg-zinc-900 border-none w-full">
                                <SelectValue placeholder={props.placeholder}  />
                            </SelectTrigger>
                            <SelectContent className="shad-select-content bg-zinc-900 border-none w-full">
                                {props.children}
                            </SelectContent>
                        </Select>

                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                </>
            )
        case FieldType.UPLOAD:
            return (
                <>
                    
                    <FormControl>
                        <Input id="picture" type="file"  placeholder={props.placeholder} {...field} className="shad-input bg-zinc-900 border-none w-full" />
                        
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                    
                </>
            )
    
        default:
            break;
    }
  
}
