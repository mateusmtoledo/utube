import { getVideos } from "@/db/helpers/video";
import { VideoType } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import cloudinary from "@/adapters/cloudinary";
import transformPresets from "@/lib/transformPresets.json";
import { pool } from "@/db";

type Data = {
  videos: VideoType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | {}>
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
    const { public_id, originalName } = req.body;
    const videoData = await cloudinary.api.resource(public_id, {
      resource_type: "video",
    });
    const thumbnail = cloudinary.url(public_id, {
      resource_type: "video",
      transformation: {
        format: "jpg",
      },
    });
    const insertResponse = await pool.query(`
      INSERT INTO videos (title, thumbnail, author_id)
      VALUES ('${originalName}', '${thumbnail}', ${userId})
      RETURNING *;
    `);
    const uploadedVideo = insertResponse.rows[0];
    const transforms = transformPresets
      .filter(
        (transform) =>
          videoData.height >= transform.height &&
          transform.width >= videoData.width
      )
      .map((transform) => ({
        ...transform,
        url: cloudinary.url(public_id, {
          resource_type: "video",
          transformation: [transform.preset],
        }),
      }));
    const transformsResponse = await pool.query(`
        INSERT INTO video_transformations (resolution, url, video_id)
        VALUES ${transforms
          .map(
            (transform) => `
          ('${transform.preset}', '${transform.url}', ${uploadedVideo.id})
        `
          )
          .join(",")}
        RETURNING *;
    `);
    res.status(200).json({
      video: {
        ...uploadedVideo,
        resolutions: transformsResponse.rows,
      },
    });
  }
}
