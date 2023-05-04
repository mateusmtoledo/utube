import { VideoDetails, VideoThumbnail, VideoTitle } from "@/components/Videos";
import getVideoUrl from "@/helpers/getVideoUrl";
import { VideoType } from "@/lib/types";
import Link from "next/link";

type WatchHistoryVideoProps = {
  video: VideoType;
};

function WatchHistoryVideo({ video }: WatchHistoryVideoProps) {
  return (
    <li>
      <Link
        className="flex flex-col sm:flex-row gap-2"
        href={getVideoUrl(video.id)}
      >
        <VideoThumbnail
          thumbnailUrl={video.thumbnail}
          videoDuration={video.duration}
          className="w-full sm:max-w-[230px]"
        />
        <div>
          <VideoTitle videoTitle={video.title} />
          <VideoDetails date={video.date} viewCount={video.view_count} />
          <VideoDetails authorName={video.author.name} />
        </div>
      </Link>
    </li>
  );
}

type WatchHistoryProps = {
  videos: VideoType[];
};

export default function WatchHistory({ videos }: WatchHistoryProps) {
  return (
    <div className="max-w-4xl m-auto">
      <h2 className="font-bold text-2xl mb-5">Watch history</h2>
      <ul className="flex flex-col gap-4">
        {videos.map((video) => (
          <WatchHistoryVideo video={video} key={video.id} />
        ))}
      </ul>
    </div>
  );
}
