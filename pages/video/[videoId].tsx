import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import SidebarModalContext from "@/contexts/SidebarModalContext";
import { getVideo } from "@/db/helpers/video";
import { VideoType } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useContext } from "react";

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
  return (
    <>
      <Head>
        <title>{`${video.title} - UTube`}</title>
      </Head>
      <Header handleToggleSidebar={toggleSidebarModal} />
      <div className="flex justify-center p-8">
        <VideoPlayer video={video} />
      </div>
    </>
  );
}
