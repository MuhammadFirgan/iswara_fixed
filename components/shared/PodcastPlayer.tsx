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
        audioElement.play().catch(error => {
          console.error("Autoplay diblokir:", error);
        });
      } else {
        audioElement.pause();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const rewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
    }
  };

  // --- Event Listeners Sinkronisasi DOM -> React ---
  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);
      return () => audioElement.removeEventListener("timeupdate", updateCurrentTime);
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  // --- Logika Pembaruan Audio (Tanpa Cascading SetState) ---
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement || !audio?.url) return;

    if (audioElement.src !== audio.url) {
      // Kita hanya memanipulasi DOM API di sini.
      // Biarkan event onPlay/onPause/onEnded yang mengatur state setIsPlaying.
      audioElement.pause();
      audioElement.src = audio.url;
      audioElement.load();
      
      // Kita bisa reset currentTime DOM secara langsung tanpa setState manual
      audioElement.currentTime = 0;

      audioElement.play().catch(() => {
        console.warn("Autoplay gagal, menunggu interaksi user.");
      });
    }
  }, [audio?.url]);

  return (
    <div className={cn("sticky bottom-0 left-0 flex size-full flex-col z-[999999999]", {
        hidden: !audio?.url,
      })}>
      <Progress
        value={duration > 0 ? (currentTime / duration) * 100 : 0}
        className="w-full"
      />

      <section className="glass flex h-[112px] w-full items-center justify-between px-4 md:px-12">
        <audio
          ref={audioRef}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/audio/${audio?.slug}`}>
            <Image
              src={audio?.thumbnail || "/images/player1.png"}
              width={64}
              height={64}
              alt="thumbnail"
              className="aspect-square rounded-xl object-cover"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white w-52">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-gray-400">{audio?.author?.fullName}</p>
          </div>
        </div>

        <div className="flex items-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5" onClick={rewind}>
            <Image src="/icons/rewind.svg" width={34} height={34} alt="rewind" />
            <h2 className="text-12 font-bold text-white">-5</h2>
          </div>
          <Image
            src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
            width={44}
            height={44}
            alt="play/pause"
            onClick={togglePlayPause}
          />
          <div className="flex items-center gap-1.5" onClick={forward}>
            <h2 className="text-12 font-bold text-white">+5</h2>
            <Image src="/icons/forward.svg" width={34} height={34} alt="forward" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-gray-300 max-md:hidden">
            {formatTime(currentTime)}/{formatTime(duration)}
          </h2>
          <Image
            src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
            width={24}
            height={24}
            alt="mute"
            onClick={toggleMute}
            className="cursor-pointer"
          />
        </div>
      </section>
    </div>
  );
};

export default PodcastPlayer;