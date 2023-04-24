import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import RecommendedVideoList from "@/components/RecommendedVideoList";
import SidebarModalContext from "@/contexts/SidebarModalContext";
import { getVideo } from "@/db/helpers/video";
import { ReactionType, VideoType } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import { AuthorAvatar } from "@/components/Videos";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useRelativeTime } from "@/helpers/timeFormatter";
import { NextPageWithLayout } from "../_app";
import VideoPageLayout from "@/layouts/VideoPageLayout";
import api from "@/adapters/axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getLikeCount, getReaction } from "@/db/helpers/reaction";

type Params = {
  videoId: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { videoId } = context.params as Params;
  const session = await getServerSession(context.req, context.res, authOptions);
  const video = await getVideo(Number(videoId));
  video.date = new Date(video.date).toISOString();
  const userReaction = await getReaction(Number(videoId), session?.user.id);
  const likeCount = await getLikeCount(Number(videoId));
  return {
    props: {
      video,
      userReaction,
      likeCount,
    },
  };
}

type VideoPageProps = {
  video: VideoType;
  userReaction: ReactionType;
  likeCount: number;
};

const VideoPage: NextPageWithLayout<VideoPageProps> = ({
  video,
  userReaction: initialUserReaction,
  likeCount: initialLikeCount,
}) => {
  const [userReaction, setUserReaction] = useState(initialUserReaction);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { id, title, author, description, view_count, date } = video;
  const relativeTime = useRelativeTime(date);

  async function likeVideo() {
    await api.post(`/video/${id}/reaction`, {
      reaction: "like",
    });
    setUserReaction("like");
    setLikeCount((prev) => prev + 1);
  }

  async function dislikeVideo() {
    await api.post(`/video/${id}/reaction`, {
      reaction: "dislike",
    });
    if (userReaction === "like") setLikeCount((prev) => prev - 1);
    setUserReaction("dislike");
  }

  async function removeReaction() {
    await api.delete(`/video/${id}/reaction`);
    if (userReaction === "like") setLikeCount((prev) => prev - 1);
    setUserReaction(null);
  }

  return (
    <>
      <Head>
        <title>{`${title} - UTube`}</title>
      </Head>
      <div className="flex flex-col lg:flex-row justify-center p-2 sm:p-8 gap-6">
        <div className="flex flex-1 max-w-6xl flex-col gap-2">
          <VideoPlayer video={video} />
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-start sm:items-center">
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
              <button
                onClick={userReaction === "like" ? removeReaction : likeVideo}
                className="flex gap-2 items-center px-4 py-2 hover:bg-slate-700"
              >
                {userReaction === "like" ? (
                  <AiFillLike size={24} />
                ) : (
                  <AiOutlineLike size={24} />
                )}
                <p className="font-medium">{likeCount}</p>
              </button>
              <div className="border-l border-l-slate-600 border-solid h-6" />
              <button
                onClick={
                  userReaction === "dislike" ? removeReaction : dislikeVideo
                }
                className="px-4 py-2 hover:bg-slate-700"
              >
                {userReaction === "dislike" ? (
                  <AiFillDislike size={24} />
                ) : (
                  <AiOutlineDislike size={24} />
                )}
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
};

VideoPage.getLayout = (page) => {
  return <VideoPageLayout>{page}</VideoPageLayout>;
};

export default VideoPage;
