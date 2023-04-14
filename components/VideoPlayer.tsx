import { useCallback, useEffect, useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ProgressBar from "./ProgressBar";
import { BiFullscreen } from "react-icons/bi";
import { VideoType } from "@/lib/types";

type VideoControlsProps = {
  isPaused: boolean;
  videoTime: number;
  videoDuration: number;
  togglePause: () => void;
  toggleFullScreen: () => void;
};

function VideoControls({
  isPaused,
  videoTime,
  videoDuration,
  togglePause,
  toggleFullScreen,
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-0 w-full p-2">
      <div className="w-full px-1 mb-2">
        <ProgressBar
          max={videoDuration}
          value={videoTime}
          fillColor="bg-green-400"
          className="h-1 bg-slate-50 bg-opacity-30"
        />
      </div>
      <div className="flex justify-between px-3 py-1">
        <div className="flex items-center">
          <button onClick={togglePause}>
            {isPaused ? (
              <BsFillPlayFill size={32} />
            ) : (
              <BsFillPauseFill size={32} />
            )}
          </button>
        </div>
        <div className="flex items-center">
          <button onClick={toggleFullScreen}>
            <BiFullscreen size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

type VideoPlayerProps = {
  video: VideoType;
};

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoCallback = useCallback((video: HTMLVideoElement) => {
    videoRef.current = video;
    if (!video) return;
    video.addEventListener("timeupdate", () => {
      setVideoTime(video.currentTime);
    });
    video.addEventListener("durationchange", () => {
      setVideoDuration(video.duration);
    });
    video.addEventListener("ended", () => {
      setIsPaused(true);
    });
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
    setIsPaused(true);
  }, [video]);

  function togglePause() {
    setIsPaused((prev) => {
      if (prev === true) {
        videoRef.current?.play();
        return false;
      } else {
        videoRef.current?.pause();
        return true;
      }
    });
  }

  function toggleFullScreen() {
    videoRef.current?.requestFullscreen();
  }

  return (
    <div className="relative w-max">
      <video
        ref={videoCallback}
        width={1237}
        height={696}
        onClick={togglePause}
      >
        <source src={video.source_url} type="video/mp4" />
      </video>
      <VideoControls
        isPaused={isPaused}
        togglePause={togglePause}
        videoTime={videoTime}
        videoDuration={videoDuration}
        toggleFullScreen={toggleFullScreen}
      />
    </div>
  );
}
