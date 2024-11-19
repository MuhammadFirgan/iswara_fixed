
import { Button } from "../ui/button";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getToken } from "@/constans/getToken";

export default async function Topbar() {

  const token = await getToken()

  return (
    <>
      {token?.id ? (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
      <Button asChild className="rounded-full bg-primary">
        <Link href="/sign-in">Masuk</Link>
      </Button>
      )}
    </>
  )
}
