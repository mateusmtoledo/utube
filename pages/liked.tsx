import Head from "next/head";
import HomeLayout from "@/layouts/HomeLayout";
import { NextPageWithLayout } from "./_app";
import VideoPlaylist from "@/components/VideoPlaylist";
import { getLikedVideos } from "@/db/helpers/user";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { PlaylistType } from "@/lib/types";
import unauthenticatedRedirect from "@/helpers/unauthRedirect";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) return unauthenticatedRedirect;
  const likedVideos = await getLikedVideos(session.user.id);
  return {
    props: {
      playlist: {
        videos: likedVideos.map((video) => ({
          ...video,
          date: new Date(video.date).toISOString(),
        })),
        title: "Liked videos",
        author: session.user,
      },
    },
  };
}

type LikedVideosProps = {
  playlist: PlaylistType;
};

const LikedVideos: NextPageWithLayout<LikedVideosProps> = ({ playlist }) => {
  return (
    <>
      <Head>
        <title>Liked videos - UTube</title>
      </Head>
      <VideoPlaylist playlist={playlist} />
    </>
  );
};

LikedVideos.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default LikedVideos;
