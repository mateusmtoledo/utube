import { VideoType } from "@/lib/types";
import { VideoThumbnail } from "./Videos";
import { ReactNode, useState } from "react";
import { useFormattedDate } from "@/helpers/timeFormatter";
import { MdOutlineEdit } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { AiOutlinePlayCircle } from "react-icons/ai";
import getVideoUrl from "@/helpers/getVideoUrl";
import Link from "next/link";

type StudioButtonProps = {
  Icon: IconType;
  href: string;
};

function StudioButton({ Icon, href }: StudioButtonProps) {
  return (
    <Link href={href}>
      <Icon size={24} className="fill-slate-400 hover:fill-slate-100" />
    </Link>
  );
}

type StudioVideoProps = {
  video: VideoType;
};

function StudioVideo({ video }: StudioVideoProps) {
  const { id, thumbnail, duration, view_count, date, title, description } =
    video;
  const formattedDate = useFormattedDate(date);
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="studio-table-row text-sm p-5 hover:bg-slate-900 h-24"
    >
      <div className="flex gap-4 min-w-0">
        <VideoThumbnail
          thumbnailUrl={thumbnail}
          videoDuration={duration}
          rounded={false}
          width={128}
          className="-my-2"
        />
        <div className="flex flex-col gap-1">
          <p className="font-medium">{title}</p>
          {hovered ? (
            <div className="flex flex-1 items-end gap-2">
              <StudioButton Icon={MdOutlineEdit} href="#" />
              <StudioButton Icon={AiOutlinePlayCircle} href={getVideoUrl(id)} />
            </div>
          ) : (
            <p
              className={`text-xs ${
                description ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {description || "Add description"}
            </p>
          )}
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
