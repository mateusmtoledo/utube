import Image from "next/image";

export type VideoType = {
  id: number;
  title: string;
  date: number;
  viewCount: number;
  author: {
    name: string;
    avatar: string;
  };
};

type VideoProps = {
  video: VideoType;
};

function Video({ video }: VideoProps) {
  const { title, date, viewCount, author } = video;

  const dateString = `${Math.floor(
    (Date.now() - date) / (1000 * 60 * 60 * 24 * 30)
  )} months ago`;

  return (
    <li>
      <div className="bg-slate-700 aspect-[9/5] w-full mb-4 rounded-xl"></div>
      <div className="flex gap-3">
        <Image
          src={author.avatar}
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
            <p>{`${viewCount} views · ${dateString}`}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

type VideoListProps = {
  videos: VideoType[];
};

export default function VideoList({ videos }: VideoListProps) {
  return (
    <ul className="flex-1 grid grid-cols-video-list gap-x-4 gap-y-8 max-w-[1500px] min-w-0 m-auto">
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </ul>
  );
}
