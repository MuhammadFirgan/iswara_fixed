'use client'

import { audioContextType, AudioProps } from "@/types"; // Gunakan AudioProps (Huruf Besar)
import { usePathname } from "next/navigation";
import React, { createContext, useContext,  useEffect,  useMemo, useState } from "react";

const AudioContext = createContext<audioContextType | undefined>(undefined);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Pastikan state menggunakan tipe AudioProps sesuai interface audioContextType
  const [audio, setAudio] = useState<AudioProps | undefined>()
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/audio/create') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAudio((prev) => (prev === undefined ? undefined : undefined));
    }
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}

export default AudioProvider;