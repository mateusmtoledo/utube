import { pool } from "@/db";
import handler from "@/pages/api/video";
import { createMocks } from "node-mocks-http";
import setupTestDb, { seedTestDb } from "@/db/setupTestDb";

beforeAll(async () => {
  await setupTestDb();
  await seedTestDb();
});

afterAll(async () => {
  await pool.end();
});

describe("/video endpoint", () => {
  describe("GET method", () => {
    it("responds with list of videos", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });

      await handler(req, res);

      expect(res._getJSONData()).toMatchObject({
        videos: [
          {
            id: 1,
            title: "Cute cat",
            description: "Cute small cat playing in the grass.",
            view_count: 0,
            thumbnail:
              "https://res.cloudinary.com/dniq0qli1/video/upload/v1680565128/cat01_oh6kuz.jpg",
            author: {
              id: 1,
              name: "John Doe",
              image:
                "https://avatars.githubusercontent.com/u/98076988?s=40&v=4",
            },
          },
        ],
      });
    });
  });
});
