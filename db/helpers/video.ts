import { UserType, VideoType } from "@/lib/types";
import { pool } from "..";
import transformationPresets from "@/lib/transformationPresets.json";
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
  const presets = transformationPresets
    .filter(
      (preset) =>
        videoData.height >= preset.height && preset.width >= videoData.width
    )
    .map((preset) => ({
      name: preset.name,
      url: cloudinary.url(public_id, {
        resource_type: "video",
        transformation: [preset.name],
      }),
    }));
  const thumbnail =
    cloudinary.url(public_id, {
      resource_type: "video",
    }) + ".jpg";
  const { video_duration, original_filename } = videoData;
  const {
    rows: [video],
  } = await pool.query(
    `
    INSERT INTO videos (title, thumbnail, duration, author_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
    [original_filename, thumbnail, video_duration, authorId]
  );
  const newResolutions = await pool.query(
    `
    INSERT INTO video_resolutions (resolution, url, video_id)
    VALUES ${presets
      .map((_, i) => `($${(i + 1) * 2 - 1}, $${(i + 1) * 2}, ${video.id})`)
      .join(", ")}
    RETURNING *;
  `,
    presets.flatMap(({ name, url }) => [name, url])
  );
  return {
    video: {
      ...video,
      resolutions: newResolutions.rows,
    },
  };
}
