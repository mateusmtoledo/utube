import getVideoUrl from "@/helpers/getVideoUrl";
import useVideos from "@/hooks/useVideos";
import { VideoType } from "@/lib/types";
import Link from "next/link";
import { AuthorName, VideoDetails, VideoThumbnail, VideoTitle } from "./Videos";

type RecommendedVideoProps = {
  video: VideoType;
};

export function RecommendedVideo({ video }: RecommendedVideoProps) {
  const { id, title, author, thumbnail, duration, view_count, date } = video;
  const videoUrl = getVideoUrl(id);
  return (
    <li className="flex gap-2 max-w-sm">
      <Link href={videoUrl} className="w-max flex-shrink-0">
        <VideoThumbnail
          thumbnailUrl={thumbnail}
          videoDuration={duration}
          width={168}
          height={94}
        />
      </Link>
      <Link href={videoUrl}>
        <VideoTitle videoTitle={title} />
        <AuthorName authorName={author.name} />
        <VideoDetails date={date} viewCount={view_count} />
      </Link>
    </li>
  );
}

export default function RecommendedVideoList() {
  const { data, isLoading } = useVideos();
  if (isLoading || !data) return null;
  return (
    <ul className="flex-1 max-w-sm flex flex-col gap-2">
      {data.videos.map((video) => (
        <RecommendedVideo key={video.id} video={video} />
      ))}
    </ul>
  );
}
