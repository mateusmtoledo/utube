import Image from "next/image";
import { useRelativeTime } from "../helpers/timeFormatter";
import React from "react";

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
  videoDuration: number | null;
  width?: number | string;
  height?: number | string;
  className?: string;
  rounded?: boolean;
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
    <div
      className={`${
        rounded ? "rounded-xl" : ""
      } bg-slate-700 relative aspect-video w-full ${className}`}
      style={{
        width,
        height,
      }}
    >
      <Image
        src={thumbnailUrl}
        alt=""
        fill
        className={`w-full h-full object-contain rounded-[inherit]`}
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

function concatWithSeparator(...values: (string | null | undefined)[]): string {
  return values.reduce((acc: string, value) => {
    if (!value) return acc;
    const convertedValue = value ? String(value) : "";
    if (acc.length === 0) return convertedValue;
    return acc + " • " + convertedValue;
  }, "");
}

type VideoDetailsProps = {
  date?: string;
  viewCount?: number;
  authorName?: string;
};

export function VideoDetails({
  date,
  viewCount,
  authorName,
}: VideoDetailsProps) {
  const views = typeof viewCount === "number" ? viewCount + " views" : null;
  const dateString = useRelativeTime(date);
  const text = concatWithSeparator(authorName, views, dateString);
  return <p className="text-slate-400 text-sm">{text}</p>;
}
