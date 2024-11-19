import { Input } from "@/components/ui/input"
import { BiSearch } from "react-icons/bi"


export default function Search() {
  return (
    <div className="lg:w-3/4 relative z-20">
      <Input type="text" className="bg-zinc-900 border-none rounded-full lg:w-full px-4 py-6 text-white" placeholder="Cari audio..."/>
      <BiSearch className="absolute right-5 top-3 w-6 h-6" />
    </div>
  )
}
