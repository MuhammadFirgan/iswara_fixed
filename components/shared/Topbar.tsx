
import { Button } from "../ui/button";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getToken } from "@/constans/getToken";
import { getUserById } from "@/lib/actions/user.action";

export default async function Topbar() {

  const token = await getToken()
  const id = token?.id


  const profileImg = await getUserById(id)

  const getInitial = (name: string) => {
    const words = name.trim().split(' ');
    const firstLetter = words[0]?.[0] || ''; 
    const secondLetter = words[1]?.[0] || ''; 
    return firstLetter + secondLetter;
  }
  

  return (
    <>
      {token?.id ? (
        <Avatar>
            <AvatarImage src={profileImg?.photo || '/profile.jpg'} />
            <AvatarFallback>{getInitial(token?.fullName)}</AvatarFallback>
        </Avatar>
      ) : (
      <Button asChild className="rounded-full bg-primary">
        <Link href="/sign-in">Masuk</Link>
      </Button>
      )}
    </>
  )
}
