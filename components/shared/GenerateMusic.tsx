'use client'

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import GenderOptions from "./GenderOptions";
import { useState } from "react";
import { generateAudio, fetchAudio } from "@/lib/helpers/audio";


export default function GenerateMusic() {

    const [ title, setTitle ] = useState<string>("")
    const [ lyrics, setLyrics ] = useState<string>("")
    const [ gender, setGender ] = useState<string>("")
    const [ taskId, setTaskId ] = useState<string>("")

    // generate musik
    
    const generateMusic = async () => {
        // const newMusic = await generateAudio({ title, lyrics, gender })
        const coba = await fetchAudio("8cfff3ea-c818-4de4-b923-79a74a7fd182")
        console.log(coba)
    }


  return (
    <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
            <Label>Judul Musik</Label>
            <Input className="shad-input bg-zinc-900 border-none w-full" placeholder="Masukkan Judul" value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2">
            <Label>Lirik Musik</Label>
            <Textarea className="shad-input bg-zinc-900 border-none w-full" placeholder="Masukkan Lirik" value={lyrics} rows={10} onChange={e => setLyrics(e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2">
            <GenderOptions 
                onChangeHandler={(value) => setGender(value)}  value={gender}
            />
        </div>

        <div className="flex flex-col gap-4 w-52">
            <Button className="bg-primary" onClick={generateMusic}>Buat lagu</Button>
            <audio controls className="w-full">
                <source src="coba.mp3" type="audio/mpeg" />
            </audio>
        </div>
    </div>
  )
}
