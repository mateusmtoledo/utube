import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { reactToVideo, removeReaction } from "@/db/helpers/reaction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId: vID } = req.query;
  const videoId = Number(vID);
  const { reaction } = req.body;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (req.method === "POST") {
    if (reaction !== "like" && reaction !== "dislike") {
      return res.status(400).json({
        message: "Invalid reaction",
      });
    }
    const reactionResult = await reactToVideo(
      videoId,
      session.user.id,
      reaction
    );
    res.json({ reaction: reactionResult });
  } else if (req.method === "DELETE") {
    await removeReaction(videoId, session.user.id);
    res.json({ reaction: null });
  } else {
    res.status(404).json({ message: "404 Not Found" });
  }
}
