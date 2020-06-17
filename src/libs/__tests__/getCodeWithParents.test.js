import getCodeWithParents from "../getCodeWithParents";

describe(`libs/getCodeWithParents()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing agreement ID`, () => {
      const received = getCodeWithParents("LEGITEXT000022197698");

      expect(received.data.id).toBe("LEGITEXT000022197698");
      expect(received.data.cid).toBe("LEGITEXT000006071367");
      expect(received.children.length).toBeGreaterThanOrEqual(1);
    });
  });
  describe(`should throw`, () => {
    it(`with a nonexistent agreement ID`, () => {
      expect(() => getCodeWithParents("LEGITEXT123456789012")).toThrow();
    });
  });
});
