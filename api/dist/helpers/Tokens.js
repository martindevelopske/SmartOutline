import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { accessTokenSecret, refreshTokenSecret } from "../envVariables.js";
const prisma = new PrismaClient();
export const createAccessToken = async (tokenObj) => {
    console.log(process.env.ACCESS_TOKEN_SECRET);
    try {
        if (!accessTokenSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = await jwt.sign(tokenObj, accessTokenSecret, {
            expiresIn: "1d",
        });
        return token;
    }
    catch (err) {
        console.log(err.message);
        throw new Error("error generating access token");
    }
};
export const createRefreshToken = async (tokenObj) => {
    try {
        if (!refreshTokenSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = await jwt.sign(tokenObj, refreshTokenSecret, {
            expiresIn: "10d",
        });
        return token;
    }
    catch (err) {
        throw new Error("error generating refresh token");
    }
};
export const verifyRefreshToken = async (token) => {
    const secret = refreshTokenSecret;
    return new Promise(async (resolve) => {
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                resolve({ status: false, token: null });
                return;
            }
            const user = (await prisma.user.findUnique({
                where: { email: decoded.email },
            }));
            if (!user) {
                resolve({ status: false, token: null });
                return;
            }
            const tokenObj = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                id: user.id,
            };
            const newAccessToken = await createAccessToken(tokenObj);
            resolve({ status: true, token: newAccessToken });
        });
    });
};
//# sourceMappingURL=Tokens.js.map