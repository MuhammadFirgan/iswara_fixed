import { barProps } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitial } from "@/lib/utils";
import Link from "next/link";
import LogoutButton from "./LogoutButton";


export default function UserPopover({ name, image, role, token } : barProps) {
  console.log(role)
  return (
    <div className="flex flex-col gap-4">
        <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={image || '/profile.jpg'} />
              <AvatarFallback>{getInitial(name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
                <h5 className="text-sm">{name}</h5>
                <span className="text-xs text-gray-500">{role === "admin" ? "Operator" : "Guru"}</span>
            </div>
        </div>
        <ul className="flex flex-col gap-3">
          {role === "admin" && (
            <li>
              <Link href="/admin/management" className="text-sm">Dashboard</Link>
            </li>
            
          )}
          <li>
            {/* @ts-ignore */}
            <Link href={`/profile/${token?.id as string}`} className="text-sm">Profile</Link>
          </li>
          <hr className="border-border/40"/>
          <li>
            <LogoutButton />
          </li>
        </ul>
    </div>
  )
}
