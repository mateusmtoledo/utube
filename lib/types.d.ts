export type VideoType = {
  id: number;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  view_count: number;
  author: UserType;
};

export type UserType = {
  id: number;
  name: string;
  image: string;
};
