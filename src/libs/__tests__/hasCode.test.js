import hasCode from "../hasCode";

describe(`libs/hasCode()`, () => {
  describe(`should return true`, () => {
    it(`with an existing code ID`, () => {
      expect(hasCode("LEGITEXT000022197698")).toBe(true);
    });
  });

  describe(`should return false`, () => {
    it(`with a nonexistant code ID`, () => {
      expect(hasCode("LEGITEXT123456789012")).toBe(false);
    });

    it(`with a malformed code ID`, () => {
      expect(hasCode("MALFORMEDID")).toBe(false);
    });
  });
});
