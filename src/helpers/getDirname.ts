import { dirname } from "path";
import { fileURLToPath } from "url";

const getDirname = (): string => dirname(fileURLToPath(import.meta.url));

export default getDirname;
