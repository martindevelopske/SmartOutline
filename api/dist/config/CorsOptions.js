import { allowedOrigins } from "./AllowedOrigins.js";
export const corsOptions = {
    origin: (origin, callback) => {
        const originString = origin;
        console.log(origin);
        if (allowedOrigins.indexOf(originString) !== -1 || !origin) {
            console.log("present.........................");
            callback(null, true);
        }
        else {
            console.log("absent....................");
            //callback(new Error("Not allowed by CORS options"), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=CorsOptions.js.map