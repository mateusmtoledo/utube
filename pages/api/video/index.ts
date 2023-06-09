import { getVideos, insertVideo, updateVideo } from "@/db/helpers/video";
import { VideoType } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Data =
  | {
      videos: VideoType[];
    }
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
  if (req.method === "GET") {
    const videos = await getVideos();
    res.status(200).json({
      videos,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const { id: userId } = session.user;
    const { public_id } = req.body;
    const video = await insertVideo(public_id, userId);
    res.status(200).json({
      video,
    });
  } else res.status(404).json({ message: "Not Found" });
}
