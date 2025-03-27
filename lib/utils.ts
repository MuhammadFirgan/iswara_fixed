import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getDuration(arrayBuffer: ArrayBuffer): Promise<number> {
  const audioContext = new AudioContext()
  const audioBuffer = audioContext.decodeAudioData(arrayBuffer)

  return (await audioBuffer).duration
}


export const formatTime = (duration: number) => {
  
  const durationInSeconds = parseFloat(duration);

  
  if (isNaN(durationInSeconds)) {
    return "00:00"; 
  }  
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = Math.floor(duration % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export const generateSlug = (title: string): string => {
  return title
        .toLowerCase() 
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-') 
        .trim(); 
}



