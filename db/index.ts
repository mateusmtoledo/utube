import { Pool } from "pg";

export const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
});
