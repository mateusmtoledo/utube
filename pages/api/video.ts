import { getVideos } from "@/db/helpers/video";
import { VideoType } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  videos: VideoType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const videos = await getVideos();
  res.status(200).json({
    videos,
  });
}
