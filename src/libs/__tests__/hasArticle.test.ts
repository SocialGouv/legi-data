import hasArticle from "../hasArticle";

describe(`libs/hasArticle()`, () => {
  describe(`should return true`, () => {
    it(`with an existing article ID`, () => {
      expect(hasArticle("LEGIARTI000018764571")).toBe(true);
    });

    it(`with an existing article CID`, () => {
      expect(hasArticle("LEGIARTI000017961623")).toBe(true);
    });
  });

  describe(`should return false`, () => {
    it(`with a nonexistant agreement ID`, () => {
      expect(hasArticle("LEGIARTI123456789012")).toBe(false);
    });

    it(`with a malformed input`, () => {
      expect(hasArticle("MALFORMEDID")).toBe(false);
    });
  });
});
