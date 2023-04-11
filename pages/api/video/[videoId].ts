import { getVideo } from "@/db/helpers/video";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | {}>
) {
  const videoId = Number(req.query.videoId);
  const video = await getVideo(videoId);
  if (req.method === "GET") {
    res.json(video);
  }
}
