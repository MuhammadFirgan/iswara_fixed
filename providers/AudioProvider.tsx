'use client';

import { audioContextType, audioProps } from "@/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AudioContext = createContext<audioContextType | undefined>(undefined);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<audioProps | undefined>()
  const pathname = usePathname();

  useEffect(() => {
    if(pathname === '/audio/create') setAudio(undefined);
  }, [pathname])

  return (
    <AudioContext.Provider value={{ audio, setAudio}}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext);

  if(!context) throw new Error('useAudio must be used within an AudioProvider');

  return context;
}

export default AudioProvider;