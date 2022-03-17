import * as fs from "fs";

export const isFile = (absolutePath: string): boolean =>
  fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isFile();
