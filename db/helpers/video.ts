import { VideoType } from "@/lib/types";
import { pool } from "..";

export async function getVideos() {
  const { rows } = await pool.query<VideoType>(`
    SELECT
      videos.id,
      title,
      description,
      thumbnail,
      date,
      view_count,
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
