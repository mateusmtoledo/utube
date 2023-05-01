export type VideoType = {
  id: number;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  view_count: number;
  author: UserType;
  duration: number;
  width: number;
  height: number;
  source_url: string;
};

export type UserType = {
  id: number;
  name: string;
  image: string;
};

export type ReactionType = "like" | "dislike" | null;

export type PlaylistType = {
  videos: VideoType[];
  title: string;
  author: UserType;
};
