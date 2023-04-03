import hello from "@/pages/api/hello";
import { createMocks } from "node-mocks-http";

describe("hello", () => {
  it("works", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await hello(req, res);

    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        name: "John Doe",
      })
    );
  });
});
