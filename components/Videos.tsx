import Image from "next/image";
import { getDateString } from "./VideoList";

function secondsToFormattedDuration(seconds: number): string {
  const numHours = Math.floor(seconds / 3600);
  seconds -= numHours * 3600;
  const numMinutes = Math.floor(seconds / 60);
  seconds -= numMinutes * 60;
  const numSeconds = Math.round(seconds);
  return `${
    numHours ? `${numHours}:${numMinutes.toString().padStart(2)}` : numMinutes
  }:${numSeconds.toString().padStart(2, "0")}`;
}

type VideoThumbnailProps = {
  thumbnailUrl: string;
  videoDuration: number;
  width?: number;
  height?: number;
};

export function VideoThumbnail({
  thumbnailUrl,
  width = 340,
  height = 180,
  videoDuration,
}: VideoThumbnailProps) {
  return (
    <div className="relative w-full aspect-[9/5] rounded-xl overflow-hidden">
      <Image
        src={thumbnailUrl}
        alt=""
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />
      <p className="absolute bottom-1 right-1 text-xs font-medium bg-slate-950 bg-opacity-90 px-1 rounded">
        {secondsToFormattedDuration(videoDuration)}
      </p>
    </div>
  );
}

type AuthorAvatarProps = {
  avatarUrl: string;
  size?: number;
};

export function AuthorAvatar({ avatarUrl }: AuthorAvatarProps) {
  return (
    <Image
      src={avatarUrl}
      alt=""
      width={36}
      height={36}
      className={`rounded-full h-9 w-9`}
    />
  );
}

type VideoTitleProps = {
  videoTitle: string;
};

export function VideoTitle({ videoTitle }: VideoTitleProps) {
  return (
    <p className="font-medium text-base leading-tight mb-2 line-clamp-2 mr-6">
      {videoTitle}
    </p>
  );
}

type AuthorNameProps = {
  authorName: string;
};

export function AuthorName({ authorName }: AuthorNameProps) {
  return <p className="text-slate-400 text-sm">{authorName}</p>;
}

type VideoDetailsProps = {
  date: string;
  viewCount: number;
};

export function VideoDetails({ date, viewCount }: VideoDetailsProps) {
  const dateString = getDateString(date);
  return (
    <p className="text-slate-400 text-sm">{`${viewCount} views • ${dateString}`}</p>
  );
}
