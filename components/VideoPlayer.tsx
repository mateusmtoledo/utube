import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { BiFullscreen } from "react-icons/bi";
import { VideoType } from "@/lib/types";
import { secondsToFormattedDuration } from "./Videos";

function VideoProgressBar() {
  const [hovered, setHovered] = useState(false);
  const { videoTime, videoDuration, skipToTime } =
    useContext(VideoPlayerContext);

  function onClickSkip(e: React.MouseEvent) {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    skipToTime(((e.clientX - left) / width) * videoDuration);
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-end h-6 cursor-pointer"
      onClick={onClickSkip}
    >
      <div
        className={`flex-1 relative overflow-hidden bg-slate-50 ${
          hovered ? "bg-opacity-60 h-2" : "bg-opacity-30 h-1"
        }`}
      >
        <div
          className="absolute h-full w-full left-0 bg-green-400"
          style={{
            transform: `scaleX(${(videoTime / videoDuration) * 100}%)`,
            transformOrigin: "left",
          }}
        ></div>
      </div>
    </div>
  );
}

function VideoControls() {
  const { isPaused, togglePause, videoTime, videoDuration } =
    useContext(VideoPlayerContext);
  const videoTimeString = secondsToFormattedDuration(videoTime);
  const videoDurationString = secondsToFormattedDuration(videoDuration);

  return (
    <div className="absolute bottom-0 w-full p-2">
      <div className="w-full px-1 mb-2">
        <VideoProgressBar />
      </div>
      <div className="flex justify-between px-3 py-1">
        <div className="flex items-center gap-4">
          <button onClick={togglePause}>
            {isPaused ? (
              <BsFillPlayFill size={32} />
            ) : (
              <BsFillPauseFill size={32} />
            )}
          </button>
          <p className="text-sm">{`${videoTimeString} / ${videoDurationString}`}</p>
        </div>
        <div className="flex items-center">
          <button>
            <BiFullscreen size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

const VideoPlayerContext = createContext({
  isPaused: false,
  videoTime: 0,
  videoDuration: 0,
  togglePause: () => {},
  toggleFullScreen: () => {},
  skipToTime: (time: number) => {},
});

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
    video.addEventListener("durationchange", () => {
      setVideoDuration(video.duration);
    });
    video.addEventListener("ended", () => {
      setIsPaused(true);
    });
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      if (videoRef.current) setVideoTime(videoRef.current?.currentTime);
    }, 10);
    () => {
      clearInterval(tick);
    };
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

  function skipToTime(time: number) {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
  }

  return (
    <VideoPlayerContext.Provider
      value={{
        isPaused,
        videoDuration,
        videoTime,
        skipToTime,
        toggleFullScreen,
        togglePause,
      }}
    >
      <div className="relative w-max">
        <video
          ref={videoCallback}
          width={1237}
          height={696}
          onClick={togglePause}
        >
          <source src={video.source_url} type="video/mp4" />
        </video>
        <VideoControls />
      </div>
    </VideoPlayerContext.Provider>
  );
}
