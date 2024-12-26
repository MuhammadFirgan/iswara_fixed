import { CardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default function Card({ image }: CardProps) {
  return (
    <div className="w-52 ">
        <Link href="/audio/1">
            <Image src={image} width={100} height={100} alt="cover audio" className="w-full aspect-square" />
            <h3 className="line-clamp-2 pt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi impedit.</h3>
        </Link>
        
        <Link href="/album/muhammad_firgan" className="py-3 flex items-center gap-2">
            <Image src={image} width={27} height={27} alt="profile" className="rounded-full aspect-square" />
            <span className="text-sm text-gray-500">Muhammad Firgan</span>
        </Link>
    </div>
  )
}
