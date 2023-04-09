import { VideoType } from "@/lib/types";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";

export function getDateString(date: string) {
  let dateNumber =
    (new Date().getTime() - new Date(date).getTime()) / 31104000000;
  const dateDistances = [12, 30, 24, 60, 60, 1000];
  const dateNames = ["year", "month", "day", "hour", "minute", "second"];
  for (let i = 0; i < dateDistances.length; i += 1) {
    if (dateNumber >= 1 || i === dateDistances.length - 1) {
      dateNumber = Math.floor(dateNumber);
      return dateNumber === 1
        ? `1 ${dateNames[i]} ago`
        : `${Math.max(dateNumber, 0)} ${dateNames[i]}s ago`;
    }
    dateNumber *= dateDistances[i];
  }
}

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

function VideoSkeleton() {
  return (
    <li>
      <div className="aspect-[9/5] w-full mb-4 rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <Skeleton className="w-full h-full relative -top-1" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton circle width={36} height={36} />
        <div>
          <p className="font-medium text-base leading-tight mb-2 line-clamp-2 mr-6">
            <Skeleton width={200} height={18} />
          </p>
          <div className="text-slate-400 text-sm">
            <p>
              <Skeleton width={150} />
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

type VideoProps = {
  video: VideoType;
};

function Video({ video }: VideoProps) {
  const { title, date, view_count, author, thumbnail, duration } = video;
  const dateString = getDateString(date);

  return (
    <li>
      <div className="bg-slate-700 aspect-[9/5] w-full mb-4 rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={thumbnail}
            alt=""
            width={340}
            height={180}
            className="w-full h-full object-cover"
          />
          <p className="absolute bottom-1 right-1 text-xs font-medium bg-slate-950 bg-opacity-90 px-1 rounded">
            {secondsToFormattedDuration(duration)}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Image
          src={author.image}
          alt=""
          width={36}
          height={36}
          className="aspect-square w-9 h-9 rounded-full"
        />
        <div>
          <p className="font-medium text-base leading-tight mb-2 line-clamp-2 mr-6">
            {title}
          </p>
          <div className="text-slate-400 text-sm">
            <p>{author.name}</p>
            <p>{`${view_count} views · ${dateString}`}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function VideoList() {
  const { data, isLoading } = useSWR("/video");
  return (
    <ul className="grid justify-center m-auto grid-cols-video-list gap-x-4 gap-y-8 max-w-7xl min-w-0">
      {isLoading
        ? new Array(8).fill(null).map((_, i) => <VideoSkeleton key={i} />)
        : data.videos.map((video: VideoType) => (
            <Video key={video.id} video={video} />
          ))}
    </ul>
  );
}
