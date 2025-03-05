import { CardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default function Card({ image }: CardProps) {
  return (
    <div className="group relative w-40 md:w-52 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-neutral-900 p-2 h-72 md:h-80">
      <Link href="/audio/1">
        <Image
          src={image}
          alt="cover audio"
          width={100}
          height={200}
          className="w-full object-cover aspect-square  z-10 "
        />
      </Link>
        <h3 className="line-clamp-2 pt-4 text-sm font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero, atque suscipit quo error ullam consequatur magni totam excepturi impedit.</h3>
      <Link href="/album/muhammad_firgan" className="py-4 flex items-center gap-2 mb-9 ">
          <Image src={image} width={27} height={27} alt="profile" className="rounded-full aspect-square" />
            <span className="text-sm text-gray-500">Muhammad Firgan</span>
      </Link>
     

     
    </div>

  )
}
