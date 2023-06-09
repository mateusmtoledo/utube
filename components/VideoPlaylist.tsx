import { PlaylistType, VideoType } from "@/lib/types";
import { VideoDetails, VideoThumbnail, VideoTitle } from "./Videos";
import { BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";
import getVideoUrl from "@/helpers/getVideoUrl";

type VideoPlaylistProps = {
  playlist: PlaylistType;
};

export default function VideoPlaylist({ playlist }: VideoPlaylistProps) {
  const playlistIsEmpty = playlist.videos.length === 0;
  return (
    <div className="flex flex-col lg:flex-row gap-2 mx-auto max-w-[1500px]">
      <div
        className={`lg:max-w-xs w-full ${
          !playlistIsEmpty ? "bg-slate-900 p-6" : ""
        } rounded-2xl`}
      >
        {!playlistIsEmpty && (
          <VideoThumbnail
            thumbnailUrl={playlist.videos[0].thumbnail}
            videoDuration={null}
            className="max-w-sm m-auto"
          />
        )}
        <p className="text-2xl font-semibold mt-6">{playlist.title}</p>
        <p className="text-sm font-medium mt-6">{playlist.author.name}</p>
        <p className="text-xs text-slate-400 mt-1">
          {playlist.videos.length} videos
        </p>
        {!playlistIsEmpty && (
          <div className="mt-8 text-sm">
            <button className="flex gap-1 items-center justify-center bg-slate-100 text-slate-950 font-medium w-36 h-9 rounded-full hover:bg-slate-300">
              <BsFillPlayFill size={28} />
              <p>Play all</p>
            </button>
          </div>
        )}
      </div>
      <PlaylistVideos videos={playlist.videos} />
    </div>
  );
}

type PlaylistVideosProps = {
  videos: VideoType[];
};

function PlaylistVideos({ videos }: PlaylistVideosProps) {
  if (videos.length === 0)
    return (
      <p className="flex-1 text-center text-slate-300 my-6">
        No videos in this playlist yet
      </p>
    );
  return (
    <ol className="flex flex-col gap-4 sm:gap-0 w-full my-3">
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
    <li className="h-full sm:h-24 w-full rounded-xl hover:bg-slate-800">
      <Link
        href={getVideoUrl(video.id)}
        className="px-4 py-2 flex flex-col sm:flex-row gap-4 w-full h-full"
      >
        <p className="hidden sm:block text-slate-500 font-medium self-center">
          {index}
        </p>
        <VideoThumbnail
          thumbnailUrl={video.thumbnail}
          videoDuration={video.duration}
          className="self-center max-w-xs sm:w-auto sm:h-full"
        />
        <div className="flex flex-col gap-1">
          <VideoTitle videoTitle={video.title} />
          <VideoDetails
            authorName={video.author.name}
            date={video.date}
            viewCount={video.view_count}
          />
        </div>
      </Link>
    </li>
  );
}
