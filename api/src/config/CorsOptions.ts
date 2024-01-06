import { CorsOptions } from "cors";
import { allowedOrigins } from "./AllowedOrigins.js";

export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    const originString = origin as string;
    if (allowedOrigins.indexOf(originString) !== -1 || !origin) {
      callback(null, true);
    } else {

      callback(new Error("Not allowed by CORS options"), false);

    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
