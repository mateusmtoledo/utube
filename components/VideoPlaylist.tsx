import { PlaylistType, VideoType } from "@/lib/types";
import { VideoDetails, VideoThumbnail, VideoTitle } from "./Videos";
import { BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";
import getVideoUrl from "@/helpers/getVideoUrl";

type VideoPlaylistProps = {
  playlist: PlaylistType;
};

export default function VideoPlaylist({ playlist }: VideoPlaylistProps) {
  // TODO add no videos message
  if (playlist.videos.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <div className="max-w-sm w-full p-6 bg-slate-900 rounded-2xl h-full min-h-[800px]">
        <VideoThumbnail
          thumbnailUrl={playlist.videos[0].thumbnail}
          videoDuration={false}
        />
        <p className="text-2xl font-semibold mt-6">{playlist.title}</p>
        <p className="text-sm font-medium mt-6">{playlist.author.name}</p>
        <p className="text-xs text-slate-400 mt-1">
          {playlist.videos.length} videos
        </p>
        <div className="mt-8 text-sm">
          <button className="flex gap-1 items-center justify-center bg-slate-100 text-slate-950 font-medium w-36 h-9 rounded-full hover:bg-slate-300">
            <BsFillPlayFill size={28} />
            <p>Play all</p>
          </button>
        </div>
      </div>
      <PlaylistVideos videos={playlist.videos} />
    </div>
  );
}

type PlaylistVideosProps = {
  videos: VideoType[];
};

function PlaylistVideos({ videos }: PlaylistVideosProps) {
  return (
    <ol className="w-full">
      {videos.map((video, index) => (
        <PlaylistVideo video={video} key={video.id} index={index + 1} />
      ))}
    </ol>
  );
}

type PlaylistVideoProps = {
  video: VideoType;
  index: number;
};

function PlaylistVideo({ video, index }: PlaylistVideoProps) {
  return (
    <li className="h-28 w-full rounded-xl hover:bg-slate-800">
      <Link
        href={getVideoUrl(video.id)}
        className="px-4 py-2 flex gap-4 w-full h-full"
      >
        <p className="text-slate-500 font-medium self-center">{index}</p>
        <VideoThumbnail
          thumbnailUrl={video.thumbnail}
          videoDuration={video.duration}
          className="h-full"
        />
        <div className="flex flex-col gap-1">
          <VideoTitle videoTitle={video.title} />
          <VideoDetails date={video.date} viewCount={video.view_count} />
        </div>
      </Link>
    </li>
  );
}
