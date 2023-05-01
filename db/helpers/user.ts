import { pool } from "..";

export async function getLikedVideos(userId: number) {
  const { rows } = await pool.query(
    `
    SELECT video_id, ROW_TO_JSON(videos.*) AS video, ROW_TO_JSON(users.*) as author
    FROM reactions
    INNER JOIN videos on reactions.video_id = videos.id
    INNER JOIN users on videos.author_id = users.id
    WHERE reaction='like' AND reactions.author_id = $1;
  `,
    [userId]
  );
  const videos = rows.map((row) => ({ ...row.video, author: row.author }));
  return videos;
}
