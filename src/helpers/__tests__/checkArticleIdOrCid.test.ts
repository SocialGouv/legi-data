import checkArticleIdOrCid from "../checkArticleIdOrCid";

describe(`helpers/checkArticleIdOrCid()`, () => {
  describe(`should not throw`, () => {
    it(`with a valid article ID`, () => {
      expect(() => checkArticleIdOrCid("LEGIARTI123456789012")).not.toThrow();
    });
  });

  describe(`should throw`, () => {
    it(`with a malformed article ID`, () => {
      expect(() => checkArticleIdOrCid("MALFORMEDID")).toThrow();
    });
  });
});
