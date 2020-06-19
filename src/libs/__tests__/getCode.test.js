import getCode from "../getCode";

describe(`libs/getCode()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing agreement ID`, () => {
      const received = getCode("LEGITEXT000022197698");

      expect(received.data.id).toBe("LEGITEXT000022197698");
      expect(received.data.cid).toBe("LEGITEXT000006071367");
      expect(received.children.length).toBeGreaterThanOrEqual(1);
    });
  });
  describe(`should throw`, () => {
    it(`with a nonexistent agreement ID`, () => {
      expect(() => getCode("LEGITEXT123456789012")).toThrow();
    });
  });
});
