import { AudioWaveform, Search, SquarePlus, Upload, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import SearchInput from "./SearchInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"  
import { barProps } from "@/types";
import UserPopover from "./UserPopover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CreateAudioModal from "./CreateAudioModal";


export default function Navbar({ name, image, role, token } : barProps) {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
              <AudioWaveform className="w-6 h-6 text-white" />
            </div>
            <Link href="/">
              <h1 className="text-xl font-bold gradient-text hidden md:block">Iswara</h1>
            </Link>
          </div>
        </div>

        <SearchInput />
        {token ? (
          <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary rounded-lg">
                <SquarePlus className="w-8 h-8 md:w-5 md:h-5" />
                <span className="hidden md:block">Tambah Audio</span>
                
              </Button>
            </DialogTrigger>
            <CreateAudioModal token={token as string}/>
         
          </Dialog>
          
          
          <Popover>
            <PopoverTrigger>
              <User className="w-5 h-5" />
            </PopoverTrigger>
            <PopoverContent className="glass border-border/40">
              <UserPopover name={name} image={image} role={role} token={token} />
            </PopoverContent>
          </Popover>
          
        </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="rounded-lg">
                Masuk
              </Button>
            </Link>
          </div>
        )}

        
      </div>
    </header>
  )
}
