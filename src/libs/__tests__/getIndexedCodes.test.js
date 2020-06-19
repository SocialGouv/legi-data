import getIndexedCodes from "../getIndexedCodes";

describe(`libs/getIndexedCodes()`, () => {
  it(`should return at least 4 indexed codes`, () => {
    expect(getIndexedCodes().length).toBeGreaterThanOrEqual(4);
  });
});
