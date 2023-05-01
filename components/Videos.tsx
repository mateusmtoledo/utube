import Image from "next/image";
import { useRelativeTime } from "../helpers/timeFormatter";

export function secondsToFormattedDuration(seconds: number): string {
  const numHours = Math.floor(seconds / 3600);
  seconds -= numHours * 3600;
  const numMinutes = Math.floor(seconds / 60);
  seconds -= numMinutes * 60;
  const numSeconds = Math.floor(seconds);
  return `${
    numHours ? `${numHours}:${numMinutes.toString().padStart(2)}` : numMinutes
  }:${numSeconds.toString().padStart(2, "0")}`;
}

type VideoThumbnailProps = {
  thumbnailUrl: string;
  videoDuration: number | false;
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
  className?: string;
};

export function VideoThumbnail({
  thumbnailUrl,
  width,
  height,
  videoDuration,
  rounded = true,
  className = "",
}: VideoThumbnailProps) {
  return (
    <div className={`relative aspect-[9/5] ${className}`}>
      <Image
        src={thumbnailUrl}
        alt=""
        width={typeof width === "number" ? width : 340}
        height={typeof height === "number" ? height : 180}
        className={`object-cover ${rounded ? "rounded-xl" : ""}`}
        style={{ width: width || "100%", height: height || "100%" }}
      />
      {!!videoDuration && (
        <p className="absolute bottom-1 right-1 text-xs font-medium bg-slate-950 bg-opacity-90 px-1 rounded">
          {secondsToFormattedDuration(videoDuration)}
        </p>
      )}
    </div>
  );
}

type AuthorAvatarProps = {
  avatarUrl: string;
  size?: number;
};

export function AuthorAvatar({ avatarUrl, size = 36 }: AuthorAvatarProps) {
  return (
    <Image
      src={avatarUrl}
      alt=""
      width={size}
      height={size}
      className={`rounded-full`}
      style={{ width: size, height: size }}
    />
  );
}

type VideoTitleProps = {
  videoTitle: string;
};

export function VideoTitle({ videoTitle }: VideoTitleProps) {
  return (
    <p className="font-medium text-base leading-tight mb-2 line-clamp-2 mr-6 break-all">
      {videoTitle}
    </p>
  );
}

type AuthorNameProps = {
  authorName: string;
};

export function AuthorName({ authorName }: AuthorNameProps) {
  return (
    <p className="text-slate-400 text-sm line-clamp-1 break-all">
      {authorName}
    </p>
  );
}

type VideoDetailsProps = {
  date: string;
  viewCount: number;
};

export function VideoDetails({ date, viewCount }: VideoDetailsProps) {
  const dateString = useRelativeTime(date);
  return (
    <p className="text-slate-400 text-sm">{`${viewCount} views • ${dateString}`}</p>
  );
}
