import { VideoType } from "@/lib/types";
import { VideoThumbnail } from "./Videos";
import { ReactNode } from "react";
import { useFormattedDate } from "@/helpers/timeFormatter";

type StudioVideoProps = {
  video: VideoType;
};

function StudioVideo({ video }: StudioVideoProps) {
  const { thumbnail, duration, view_count, date, title } = video;
  const formattedDate = useFormattedDate(date);

  return (
    <li className="studio-table-row text-sm p-5 hover:bg-slate-900">
      <div className="flex gap-4 min-w-0">
        <VideoThumbnail
          thumbnailUrl={thumbnail}
          videoDuration={duration}
          rounded={false}
          width={128}
          className="-my-2"
        />
        <div>
          <p className="font-medium">{title}</p>
        </div>
      </div>
      <p>{formattedDate}</p>
      <p>{view_count}</p>
      <p>0</p>
      <p>0</p>
    </li>
  );
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return <p className="text-sm text-slate-400 font-medium">{children}</p>;
}

function TableHeader() {
  return (
    <div className="studio-table-row px-5 py-2">
      <ColumnTitle>Video</ColumnTitle>
      <ColumnTitle>Date</ColumnTitle>
      <ColumnTitle>Views</ColumnTitle>
      <ColumnTitle>Comments</ColumnTitle>
      <ColumnTitle>Likes</ColumnTitle>
    </div>
  );
}

type StudioVideosProps = {
  videos: VideoType[];
};

export default function StudioVideos({ videos }: StudioVideosProps) {
  return (
    <div className="my-4">
      <TableHeader />
      <ul className="flex flex-col">
        {videos.map((video) => (
          <StudioVideo key={video.id} video={video} />
        ))}
      </ul>
    </div>
  );
}
