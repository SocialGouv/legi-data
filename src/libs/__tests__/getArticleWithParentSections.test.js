import getArticleWithParentSections from "../getArticleWithParentSections";

describe(`libs/getArticleWithParentSections()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing main article ID`, () => {
      const received = getArticleWithParentSections("LEGIARTI000018764571");

      expect(received.data.cid).toBe("LEGIARTI000017961623");
      expect(received.data.id).toBe("LEGIARTI000018764571");
      expect(received.sections.length).toBeGreaterThanOrEqual(1);
    });

    it(`with an existing main article CID`, () => {
      const received = getArticleWithParentSections("LEGIARTI000017961623");

      expect(received.data.cid).toBe("LEGIARTI000017961623");
      expect(received.data.id).toBe("LEGIARTI000018764571");
      expect(received.sections.length).toBeGreaterThanOrEqual(1);
    });
  });
});
