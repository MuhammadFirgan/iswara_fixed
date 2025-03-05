import { Input } from "@/components/ui/input"
import Image from "next/image"



export default function Search() {
  return (
    <div className="lg:w-1/2 relative z-20 w-60">
      <Input type="text" className="bg-zinc-900 border-none rounded-full lg:w-full px-4 py-6 text-white" placeholder="Cari audio..."/>
      <Image src="/icons/search.svg" width={6} height={6} alt="icon sidebar" className="absolute right-5 top-3 w-6 h-6" />
    </div>
  )
}
