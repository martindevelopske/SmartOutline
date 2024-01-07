import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

export const accessTokenSecret: string | undefined =
  process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret: string | undefined =
  process.env.REFRESH_TOKEN_SECRET;
