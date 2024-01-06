import { allowedOrigins } from "./AllowedOrigins.js";
export const corsOptions = {
    origin: (origin, callback) => {
        const originString = origin;
        if (allowedOrigins.indexOf(originString) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));

        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=CorsOptions.js.map