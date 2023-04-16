import { VideoType } from "@/lib/types";
import { pool } from "..";
import cloudinary from "@/adapters/cloudinary";

export async function getVideos() {
  const { rows } = await pool.query<VideoType>(`
    SELECT
      videos.id,
      title,
      description,
      thumbnail,
      date,
      view_count,
      duration,
      json_build_object(
        'id', users.id,
        'name', users.name,
        'image', users.image
      ) AS author
    FROM videos
    INNER JOIN users
    ON users.id = videos.author_id;
  `);
  return rows;
}

export async function insertVideo(public_id: string, authorId: number) {
  const videoData = await cloudinary.api.resource(public_id, {
    resource_type: "video",
    image_metadata: true,
  });
  const thumbnail =
    cloudinary.url(public_id, {
      resource_type: "video",
    }) + ".jpg";
  const { video_duration, original_filename, secure_url, width, height } =
    videoData;
  const {
    rows: [video],
  } = await pool.query<VideoType>(
    `
    INSERT INTO videos (title, thumbnail, duration, source_url, width, height, author_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
    [
      original_filename,
      thumbnail,
      video_duration,
      secure_url,
      width,
      height,
      authorId,
    ]
  );
  return video;
}

export async function getVideo(videoId: number) {
  const {
    rows: [video],
  } = await pool.query<VideoType>(
    `
      SELECT
        videos.id,
        title,
        description,
        thumbnail,
        date,
        view_count,
        duration,
        width,
        height,
        source_url,
        json_build_object(
          'id', users.id,
          'name', users.name,
          'image', users.image
        ) AS author
      FROM videos
      INNER JOIN users
      ON users.id = videos.author_id
      WHERE videos.id = $1;
  `,
    [videoId]
  );
  return video;
}

type UpdateParams = {
  title: string;
  description: string;
};

export async function updateVideo(
  videoId: number,
  { title, description }: UpdateParams
) {
  const {
    rows: [video],
  } = await pool.query(
    `
    UPDATE videos
    SET title = $1, description = $2
    WHERE id = $3;
  `,
    [title, description, videoId]
  );
  return video;
}
