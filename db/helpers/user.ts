import { pool } from "..";

export async function getLikedVideos(userId: number) {
  const { rows } = await pool.query(
    `
    SELECT video_id, ROW_TO_JSON(videos.*) AS video
    FROM reactions
    INNER JOIN videos on reactions.video_id = videos.id
    WHERE reaction='like' AND reactions.author_id = $1;
  `,
    [userId]
  );
  const videos = rows.map((row) => row.video);
  return videos;
}
