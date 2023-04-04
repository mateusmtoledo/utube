import { readFileSync } from "node:fs";
import { pool } from ".";

export async function seedTestDb() {
  const queryText = readFileSync(`${__dirname}/seedDb.sql`).toString();
  await pool.query(queryText);
}

export default async function setupTestDb() {
  const queryText = readFileSync(`${__dirname}/schema.sql`).toString();
  await pool.query(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;
    ${queryText}
  `);
}
