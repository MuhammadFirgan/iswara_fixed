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

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}`;
};



