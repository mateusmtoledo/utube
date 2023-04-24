import HomeLayout from "@/layouts/HomeLayout";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import StudioVideos from "@/components/StudioVideos";
import { VideoType } from "@/lib/types";
import { getVideosByAuthorId } from "@/db/helpers/video";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type StudioPageProps = {
  videos: VideoType[];
};

const StudioPage: NextPageWithLayout<StudioPageProps> = ({ videos }) => {
  return (
    <>
      <Head>
        <title>Studio - UTube</title>
      </Head>
      <div className="max-w-[1500px] mx-auto">
        <h2 className="font-semibold text-2xl">Channel Content</h2>
        <StudioVideos videos={videos} />
      </div>
    </>
  );
};

StudioPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const videos = await getVideosByAuthorId(session?.user.id);
  return {
    props: {
      videos: videos.map((video) => ({
        ...video,
        date: new Date(video.date).toISOString(),
      })),
    },
  };
}

export default StudioPage;
