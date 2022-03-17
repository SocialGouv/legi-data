import getIndexedArticle from "../getIndexedArticle";

describe(`libs/getIndexedArticle()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing article ID`, () => {
      expect(getIndexedArticle("LEGIARTI000018764571")).toMatchObject({
        articleCid: "LEGIARTI000017961623",
        articleId: "LEGIARTI000018764571",
        codeId: "LEGITEXT000006072050",
      });
    });

    it(`with an existing article CID`, () => {
      expect(getIndexedArticle("LEGIARTI000017961623")).toMatchObject({
        articleCid: "LEGIARTI000017961623",
        articleId: "LEGIARTI000018764571",
        codeId: "LEGITEXT000006072050",
      });
    });
  });

  describe(`should throw`, () => {
    it(`with a nonexistent article ID or CID`, () => {
      expect(() => getIndexedArticle("LEGIARTI123456789012")).toThrow();
    });
  });
});
