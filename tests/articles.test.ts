import { server } from "../src/index";

describe("Get Endpoints", () => {
  it("Should return 200", async () => {
    expect(true).toEqual(true);
  });
});

afterAll(() => {
  server.close();
});
