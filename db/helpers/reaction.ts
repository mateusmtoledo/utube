import { ReactionType } from "@/lib/types";
import { pool } from "..";

export async function getLikeCount(videoId: number) {
  const {
    rows: [{ count: likeCount }],
  } = await pool.query(
    `
    SELECT COUNT(*)
    FROM reactions
    WHERE video_id = $1 AND reaction = 'like';
  `,
    [videoId]
  );
  return Number(likeCount);
}

export async function reactToVideo(
  videoId: number,
  authorId: number,
  reaction: ReactionType
) {
  const {
    rows: [reactionResult],
  } = await pool.query(
    `
    INSERT INTO reactions (video_id, author_id, reaction)
    VALUES ($1, $2, $3)
    ON CONFLICT ON CONSTRAINT unique_video_author
    DO UPDATE SET reaction = $3
    WHERE reactions.video_id = $1 AND reactions.author_id = $2;
  `,
    [videoId, authorId, reaction]
  );
  return reactionResult;
}

export async function removeReaction(videoId: number, authorId: number) {
  await pool.query(
    `
    DELETE FROM reactions
    WHERE video_id = $1 AND author_id = $2;
  `,
    [videoId, authorId]
  );
}

export async function getReaction(videoId: number, userId: number) {
  const {
    rows: [result],
  } = await pool.query(
    `
      SELECT reaction FROM reactions
      WHERE video_id = $1 AND author_id = $2;
    `,
    [videoId, userId]
  );
  return result?.reaction || null;
}
