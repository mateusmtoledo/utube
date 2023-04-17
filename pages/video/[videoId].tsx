import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import RecommendedVideoList from "@/components/RecommendedVideoList";
import SidebarModalContext from "@/contexts/SidebarModalContext";
import { getVideo } from "@/db/helpers/video";
import { VideoType } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useContext } from "react";
import { AuthorAvatar } from "@/components/Videos";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useRelativeTime from "@/components/RelativeTime";

type Params = {
  videoId: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { videoId } = context.params as Params;
  const video = await getVideo(Number(videoId));
  video.date = new Date(video.date).toISOString();
  return {
    props: {
      video,
    },
  };
}

type VideoPageProps = {
  video: VideoType;
};

export default function VideoPage({ video }: VideoPageProps) {
  const { toggleSidebarModal } = useContext(SidebarModalContext);
  const { title, author, description, view_count, date } = video;
  const relativeTime = useRelativeTime(date);
  return (
    <>
      <Head>
        <title>{`${title} - UTube`}</title>
      </Head>
      <Header handleToggleSidebar={toggleSidebarModal} />
      <div className="flex justify-center p-8 gap-6">
        <div className="flex flex-1 max-w-6xl flex-col gap-2">
          <VideoPlayer video={video} />
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <AuthorAvatar size={40} avatarUrl={author.image} />
              <div className="mr-2">
                <p className="font-medium text-base leading-tight line-clamp-2">
                  {author.name}
                </p>
                <p className="text-slate-400 text-sm">0 subscribers</p>
              </div>
              <button className="rounded-full bg-slate-50 px-4 py-2 text-slate-950 font-medium text-sm hover:bg-slate-300">
                Subscribe
              </button>
            </div>
            <div className="flex items-center rounded-full bg-slate-800 overflow-hidden">
              <button className="flex gap-2 items-center px-4 py-2 hover:bg-slate-700">
                <AiOutlineLike size={24} />
                <p className="font-medium">0</p>
              </button>
              <div className="border-l border-l-slate-600 border-solid h-6" />
              <button className="px-4 py-2 hover:bg-slate-700">
                <AiOutlineDislike size={24} />
              </button>
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl px-3 py-2 text-sm mt-2">
            <p className="font-medium mb-2">{`${view_count} views ${relativeTime}`}</p>
            {description ? (
              <p>{description}</p>
            ) : (
              <p className="text-slate-300">No description provided.</p>
            )}
          </div>
        </div>
        <RecommendedVideoList />
      </div>
    </>
  );
}
