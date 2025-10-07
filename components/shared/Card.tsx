import { CardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default function Card({ image, title, name, profile, slug, nip }: CardProps) {
  return (
    <div className="group relative w-44 md:w-52 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 glass glass-hover p-2 h-72 md:h-80">
      <Link href={`/audio/${slug}`}>
        <Image
          src={image && image.trim() !== '' ? image : '/profile.jpg'}
          alt="cover audio"
          width={100}
          height={200}
          className="w-full object-cover aspect-square z-10 "
        />
        <h3 className="line-clamp-2 pt-4 text-sm font-bold">{title}</h3>
      </Link>
      <Link href={`/album/${nip}`} className="py-4 flex items-center gap-2 mb-9 ">
          <Image src={profile || '/profile.jpg'} width={27} height={27} alt="profile" className="rounded-full aspect-square" />
            <span className="text-sm text-gray-500">{name}</span>
      </Link>
     

     
    </div>

  )
}
