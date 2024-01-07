import jwt from "jsonwebtoken";
//verifying the access token
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const verifyJWT = async (req, res, next) => {
    try {
        //check auth header
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader ||
            (Array.isArray(authHeader) && authHeader[0]?.startsWith("Bearer "))) {
            throw new Error("No bearer token");
        }
        const token = Array.isArray(authHeader)
            ? authHeader[0].slice(7)
            : authHeader.slice(7);
        const tokenSecret = accessTokenSecret;
        await jwt.verify(token, tokenSecret, (err, decoded) => {
            if (err) {
                throw new Error("Invalid Token. Error validating the Token");
            }
            else {
                next();
            }
        });
    }
    catch (err) {
        res.send(err.message);
    }
};
//# sourceMappingURL=TokenVerifier.js.map