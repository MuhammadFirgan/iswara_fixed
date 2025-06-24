import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string'
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types"
import redis from "./redis"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getDuration(arrayBuffer: ArrayBuffer): Promise<number> {
  const audioContext = new AudioContext()
  const audioBuffer = audioContext.decodeAudioData(arrayBuffer)

  return (await audioBuffer).duration
}


export const formatTime = (duration: number) => {
  
  if (isNaN(duration)) {
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

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key=> {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

// export async function getCachedOrDB(cacheKey: string, dbQuery: () => Promise<any>) {
//   const cached = await redis.get(cacheKey)

//   if(cached) return JSON.parse(cached)

//   const result = await dbQuery()

//   await redis.setex(cacheKey, 3600, JSON.stringify(result))

//   return result

// }







