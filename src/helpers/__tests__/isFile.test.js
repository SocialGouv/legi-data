import isFile from "../isFile";

describe(`helpers/isFile()`, () => {
  describe(`should return true`, () => {
    it(`with an existing file absolute path`, () => {
      expect(isFile(`${__dirname}/fixtures/aFile`)).toBe(true);
    });
  });

  describe(`should return false`, () => {
    it(`with an existing file relative path`, () => {
      expect(isFile("./fixtures/aFile")).toBe(false);
    });

    it(`with an existing directory path`, () => {
      expect(isFile("./fixtures/aDirectory")).toBe(false);
    });

    it(`with a non-existant file path`, () => {
      expect(isFile("./fixtures/aNonexistentFile")).toBe(false);
    });
  });
});
