CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE videos
(
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL DEFAULT '',
  thumbnail TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  duration REAL NOT NULL,
  source_url TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,

  PRIMARY KEY (id)
);

CREATE TYPE reaction AS ENUM ('like', 'dislike'); 

CREATE TABLE reactions 
(
  id SERIAL,
  video_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  reaction reaction NOT NULL,

  PRIMARY KEY (id),
  CONSTRAINT unique_video_author
    UNIQUE (video_id, author_id)
);

CREATE TABLE video_views
(
  id SERIAL,
  video_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT unique_video_view
    UNIQUE (video_id, user_id)
);
