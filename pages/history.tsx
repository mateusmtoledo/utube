import Head from "next/head";
import HomeLayout from "@/layouts/HomeLayout";
import { NextPageWithLayout } from "./_app";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { VideoType } from "@/lib/types";
import { getWatchHistory } from "@/db/helpers/video";
import WatchHistory from "@/components/History";
import unauthenticatedRedirect from "@/helpers/unauthRedirect";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) return unauthenticatedRedirect;
  const videos = await getWatchHistory(session.user.id);
  const historyVideos = videos.map((video) => ({
    ...video,
    date: new Date(video.date).toISOString(),
  }));
  return {
    props: {
      videos: historyVideos,
    },
  };
}

type WatchHistoryProps = {
  videos: VideoType[];
};

const WatchHistoryPage: NextPageWithLayout<WatchHistoryProps> = ({
  videos,
}) => {
  return (
    <>
      <Head>
        <title>Watch history - UTube</title>
      </Head>
      <WatchHistory videos={videos} />
    </>
  );
};

WatchHistoryPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default WatchHistoryPage;
