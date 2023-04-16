import { getVideos, insertVideo, updateVideo } from "@/db/helpers/video";
import { VideoType } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Data =
  | {
      video: VideoType;
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { title, description } = req.body;
    const videoId = Number(req.query.videoId);
    const video = await updateVideo(videoId, { title, description });
    res.json({ video });
  } else {
    res.status(404).json({
      message: "Not Found",
    });
  }
}
