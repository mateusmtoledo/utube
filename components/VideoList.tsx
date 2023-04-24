import getVideoUrl from "@/helpers/getVideoUrl";
import useVideos from "@/hooks/useVideos";
import { VideoType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";
import {
  AuthorAvatar,
  AuthorName,
  VideoDetails,
  VideoThumbnail,
  VideoTitle,
} from "./Videos";

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
  const { id, title, date, view_count, author, thumbnail, duration } = video;

  return (
    <li className="w-full">
      <Link href={getVideoUrl(id)} className="space-y-3 w-full">
        <VideoThumbnail thumbnailUrl={thumbnail} videoDuration={duration} />
        <div className="flex gap-3">
          <AuthorAvatar avatarUrl={author.image} />
          <div>
            <VideoTitle videoTitle={title} />
            <AuthorName authorName={author.name} />
            <VideoDetails viewCount={view_count} date={date} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default function VideoList() {
  const { data, isLoading } = useVideos();
  return (
    <ul className="grid justify-center justify-items-center m-auto grid-cols-video-list gap-x-4 gap-y-8 max-w-[1500px] min-w-0">
      {isLoading || !data
        ? new Array(8).fill(null).map((_, i) => <VideoSkeleton key={i} />)
        : data.videos.map((video: VideoType) => (
            <Video key={video.id} video={video} />
          ))}
    </ul>
  );
}
