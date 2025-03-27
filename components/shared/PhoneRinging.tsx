'use client'
import Image from "next/image";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogCancel } from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react";

// Helper untuk format waktu MM.SS
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}`;
};

export default function PhoneRinging({ name, avatar, audio_url }: { name: String; avatar: String; audio_url: String; }) {
  const [isRinging, setIsRinging] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recordingAudio, setRecordingAudio] = useState<HTMLAudioElement | null>(null); 

  useEffect(() => {
    let ringingAudio: HTMLAudioElement | null = null;
    let interval: NodeJS.Timeout | null = null;

    if (isRinging) {
      ringingAudio = new Audio("/ringing.mp3"); 
      ringingAudio.play();
      
      ringingAudio.onended = () => {
        setIsRinging(false);
        setIsRecording(true);
      };
    }

    if (isRecording) {
      const newRecordingAudio = new Audio(audio_url);

      setRecordingAudio(newRecordingAudio);

      newRecordingAudio.play();
      setElapsedTime(0); 

      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      newRecordingAudio.onended = () => {
        setIsRecording(false);
        clearInterval(interval!);
      };
    }

    return () => {
      ringingAudio?.pause();
      ringingAudio?.remove();
      if (interval) clearInterval(interval);
    };
  }, [isRinging, isRecording]);

  const stopRecording = () => {
    if (recordingAudio) {
      recordingAudio.pause();
      recordingAudio.currentTime = 0; 
      setRecordingAudio(null); 
    }
    setIsRecording(false);
    setElapsedTime(0);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="max-w-sm bg-primary rounded-3xl w-full py-3" onClick={() => setIsRinging(true)}>
        Mainkan
      </AlertDialogTrigger>
      
      {isRinging && (
        <AlertDialogContent className="bg-black w-96 h-96 shadow-green-500 border-0 rounded-xl">
          <AlertDialogHeader>
            <AlertDialogDescription className="flex flex-col items-center gap-3 mb-20 text-xl">      
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 items-center">
                <span>{name}</span>
                <span className="text-sm text-gray-300">Berdering...</span>
              </div>   
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-col justify-center items-center w-full gap-5">
              <AlertDialogCancel className="border-0 bg-red-500 rounded-full" onClick={() => setIsRinging(false)}>
                <Image src="/icons/ringing.svg" width={24} height={24} alt="cancel phone"/>
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}

      {isRecording && (
        <AlertDialogContent className="bg-black min-w-full z-[999999999] shadow-green-500 border-0 rounded-xl  min-h-screen">
          <AlertDialogHeader>
            <AlertDialogDescription className="flex flex-col items-center gap-3 mb-20 text-xl">      
              <Avatar className="w-32 h-32">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 items-center">
                <span>{name}</span>
                {/* 🔹 Menampilkan waktu dalam format MM.SS */}
                <span className="text-sm text-gray-300">{formatTime(elapsedTime)}</span>
              </div>   
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-col justify-center items-center w-full gap-5">
              {/* 🔹 Menghentikan audio saat tombol cancel ditekan */}
              <AlertDialogCancel className="border-0 bg-red-500 rounded-full" onClick={stopRecording}>
                <Image src="/icons/ringing.svg" width={24} height={24} alt="cancel phone"/>
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
