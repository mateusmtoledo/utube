INSERT INTO users (name, email, image) VALUES
(
  'John Doe',
  'johndoe@utube.com',
  'https://avatars.githubusercontent.com/u/98076988?s=40&v=4'
);

INSERT INTO videos (title, description, thumbnail, author_id) VALUES
(
  'Cute cat',
  'Cute small cat playing in the grass.',
  'https://res.cloudinary.com/dniq0qli1/video/upload/v1680565128/cat01_oh6kuz.jpg',
  1
);

INSERT INTO video_transformations (resolution, url, video_id) VALUES
(
  '1080p',
  'https://res.cloudinary.com/dniq0qli1/video/upload/v1680565128/cat01_oh6kuz.mp4',
  1
);
