export type VideoResolution = {
  resolution: string;
  url: string;
};

export type VideoType = {
  id: number;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  view_count: number;
  author: UserType;
  duration: number;
  resolutions: VideoResolution[];
};

export type UserType = {
  id: number;
  name: string;
  image: string;
};
