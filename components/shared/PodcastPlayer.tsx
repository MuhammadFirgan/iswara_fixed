"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn, formatTime } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import { Progress } from "../ui/progress";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const { audio } = useAudio();

  // --- Handlers Pemutaran ---

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (audioElement.paused) {
        // Coba putar audio. Tangani jika browser memblokir
        audioElement.play().catch(error => {
          console.error("Autoplay was prevented (User interaction needed):", error);
        });
      } else {
        audioElement.pause();
      }
    }
    // State isPlaying akan diatur oleh event DOM (onPlay/onPause)
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const rewind = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 5); 
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime); 
    }
  };

  const forward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5); 
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime); 
    }
  };

  // --- Event Listeners untuk Sinkronisasi State ---
  
  // Memperbarui waktu saat ini
  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
      // Atur currentTime menjadi 0 saat metadata baru dimuat (reset)
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // --- HANDLER BARU: Coba Putar Otomatis Setelah Data Cukup ---
  const handleCanPlay = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
        // Jika sebelumnya bukan sedang bermain, coba putar otomatis
        // Ini adalah kesempatan kedua untuk mencoba autoplay setelah pemuatan berhasil.
        if (audioElement.paused) {
            audioElement.play().catch(error => {
                console.warn("Autoplay diblokir setelah CanPlay. Menunggu interaksi pengguna.");
            });
        }
    }
  };

  // --- Logika Pembaruan Audio/Source (Kritis) ---
  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
        
      // Cek apakah URL audio berubah
      const isUrlChanged = audioElement.src !== audio?.url;

      if (audio?.url && isUrlChanged) {
        
        // 1. CLEANUP (Hentikan pemutaran lama)
        audioElement.pause();
        audioElement.currentTime = 0;
        setIsPlaying(false);

        // 2. KONTROL SRC DI JAVASCRIPT
        audioElement.src = audio.url;
        
        // 3. LOAD BARU
        // Ini memicu event 'canplay' setelah pemuatan data yang cukup.
        audioElement.load();
        
        // CATATAN: Pemanggilan play() dihapus dari sini
        // agar browser memiliki waktu untuk memproses URL yang aneh.

      } else if (!audio?.url && audioElement.src) {
        // Jika URL dihapus, bersihkan elemen
        audioElement.pause();
        audioElement.src = "";
        setDuration(0);
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  }, [audio]);

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col z-[99999999999]", {
        hidden: !audio?.url || audio?.url === "",
      })}
    >
      <Progress
        value={duration > 0 ? (currentTime / duration) * 100 : 0}
        className="w-full"
        max={duration > 0 ? duration : 1}
      />

      <section className="glass flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        {/* Elemen AUDIO: Hapus atribut 'src' dari JSX */}
        <audio
          ref={audioRef}
          // src={audio?.url} <-- DIHAPUS DARI SINI
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
          onPlay={handlePlay}    // Set isPlaying = true
          onPause={handlePause}  // Set isPlaying = false
          onCanPlay={handleCanPlay} // Coba putar otomatis setelah data siap
        />

        <div className="flex items-center gap-4 max-md:hidden">
          {/* Mengarahkan ke halaman detail audio */}
          <Link href={`/audio/${audio?.slug}`}>
            <Image
              src={audio?.thumbnail! || "/images/player1.png"}
              width={64}
              height={64}
              alt="player thumbnail"
              className="aspect-square rounded-xl object-cover"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1 w-52">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">{audio?.author}</p>
          </div>
        </div>

        <div className="flex items-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            <Image
              src={"/icons/rewind.svg"}
              width={34}
              height={34}
              alt="rewind"
              onClick={rewind}
            />
            <h2 className="text-12 font-bold text-white-4">-5</h2>
          </div>
          <Image
            src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
            width={44}
            height={44}
            alt="play/pause"
            onClick={togglePlayPause}
          />
          <div className="flex items-center gap-1.5">
            <h2 className="text-12 font-bold text-white-4">+5</h2>
            <Image
              src={"/icons/forward.svg"}
              width={34}
              height={34}
              alt="forward"
              onClick={forward}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden">
            {formatTime(currentTime)}/{formatTime(duration)}
          </h2>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              width={24}
              height={24}
              alt="mute unmute"
              onClick={toggleMute}
              className="cursor-pointer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPlayer;
