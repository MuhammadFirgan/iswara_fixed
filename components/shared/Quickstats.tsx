import Link from "next/link";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";


interface quickStatsProps {
  name: string
  role: string
  total: string
  image: string
  token: object | string
}



export default function Quickstats({ name, role, total, image, token }: quickStatsProps) {
  return (
    <div className="p-4 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 rounded-xl border border-emerald-500/20">
      <div className="flex items-center mb-4">
        <div className="relative">
          <img 
            src={image} 
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/50"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900"></div>
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-semibold text-emerald-300 text-sm">{name}</h4>
          <p className="text-gray-400 text-xs">{role === "admin" ? "Operator" : "Guru" }</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="p-1 h-auto text-gray-400 hover:text-emerald-300"
        >
          {/* <Settings className="w-4 h-4" /> */}
        </Button>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Total Audio</span>
          <span className="text-emerald-400 font-semibold text-sm">{total} audios</span>
        </div>
        
        
      </div>

      <div className="flex flex-col justify-center space-y-2">
          <Button 
            asChild 
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-medium text-sm"
            size="sm"
          >
            <Link href="/audio/create">Create Content</Link>
            {/* <Plus className="w-4 h-4 mr-2" /> */}
          </Button>
          
          <Button
            asChild 
            variant="ghost"
            className="w-full text-gray-300 hover:text-emerald-300 hover:bg-gray-700/50 text-sm"
            
          >

            {/* <User className="w-4 h-4 mr-2" /> */}
            <Link href={token ? `/profile/${(token as { id: string })?.id}` : '/sign-in'}>View Profile</Link>
          </Button>
          
          {/* <Button 
            variant="ghost"
            className="w-full text-gray-400 hover:text-red-400 hover:bg-red-900/20 text-sm"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button> */}
          <LogoutButton />
        </div>
      </div>
  )
}
