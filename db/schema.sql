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
  description VARCHAR(255),
  thumbnail TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT author
    FOREIGN KEY (author_id)
      REFERENCES users(id)
);

CREATE TABLE video_transformations
(
  id SERIAL,
  resolution VARCHAR(10) NOT NULL,
  url TEXT NOT NULL,
  video_id INTEGER NOT NULL,

  PRIMARY KEY (id),
  CONSTRAINT video
    FOREIGN KEY (video_id)
      REFERENCES videos(id)
);
