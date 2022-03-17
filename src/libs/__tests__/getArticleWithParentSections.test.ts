import path from "path";

import getArticleWithParentSections from "../getArticleWithParentSections";

jest.mock("../../helpers/getDirname", () => jest.fn(() => path.join(__dirname, "../")));

describe(`libs/getArticleWithParentSections()`, () => {
  describe(`should match properties`, () => {
    it(`with an existing main article ID`, async () => {
      const received = await getArticleWithParentSections("LEGIARTI000018764571");

      expect(received.data.cid).toBe("LEGIARTI000017961623");
      expect(received.data.id).toBe("LEGIARTI000018764571");
      expect(received.sections.length).toBeGreaterThanOrEqual(1);
    });

    it(`with an existing main article CID`, async () => {
      const received = await getArticleWithParentSections("LEGIARTI000017961623");

      expect(received.data.cid).toBe("LEGIARTI000017961623");
      expect(received.data.id).toBe("LEGIARTI000018764571");
      expect(received.sections.length).toBeGreaterThanOrEqual(1);
    });
  });
});
