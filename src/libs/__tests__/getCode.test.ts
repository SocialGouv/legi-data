import path from "path";

import getCode from "../getCode";

jest.mock("../../helpers/getDirname", () => jest.fn(() => path.join(__dirname, "../")));

describe(`libs/getCode()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing agreement ID`, async () => {
      const received = await getCode("LEGITEXT000022197698");

      expect(received.data.id).toBe("LEGITEXT000022197698");
      expect(received.data.cid).toBe("LEGITEXT000006071367");
      expect(received.children.length).toBeGreaterThanOrEqual(1);
    });
  });
  describe(`should throw`, () => {
    it(`with a nonexistent agreement ID`, async () => {
      await expect(async () => getCode("LEGITEXT123456789012")).rejects.toEqual(
        new Error("No code found with this ID (LEGITEXT123456789012)."),
      );
    });
  });
});
