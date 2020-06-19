import getIndexedArticles from "../getIndexedArticles";

describe(`libs/getIndexedArticles()`, () => {
  it(`should return at least 1 indexed article`, () => {
    expect(getIndexedArticles().length).toBeGreaterThanOrEqual(1);
  });
});
