
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


  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
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
    if (audioRef.current) {
      setDuration(audioRef.current?.duration);
    }
  };

  
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  console.log(audioRef.current?.duration)
  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.url) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col z-[99999999999]", {
        hidden: !audio?.url || audio?.url === "",
      })}
    >
      <Progress
        value={(currentTime / duration) * 100}
        className="w-full"
        max={duration}
      />
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={audio?.url}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcast/${audio?.slug}`}>
            <Image
              src={audio?.thumbnail! || "/images/player1.png"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
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
            alt="play"
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