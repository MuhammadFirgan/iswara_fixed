
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  type DropdownProps = {
    value?: string;
    onChangeHandler?: (value: string) => void;
    disabled?: boolean
  };
  

export default function GenderOptions({ value, onChangeHandler, disabled }: DropdownProps) {
  return (
    <Select onValueChange={onChangeHandler} value={value} disabled={disabled}>
        <SelectTrigger className="shad-select-trigger bg-zinc-900 border-none">
          <SelectValue placeholder="Pilih Gender Penyanyi" />
        </SelectTrigger>
        <SelectContent className="shad-select-content bg-zinc-800 border-none">
          <SelectGroup>
            <SelectItem value="male voice" >Laki-laki</SelectItem>
            <SelectItem value="female voice">Perempuan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}
