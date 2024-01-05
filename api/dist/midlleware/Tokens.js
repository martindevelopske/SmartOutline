import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const prisma = new PrismaClient();
const tokenOptions = { expiresIn: "20s" };
export const createAccessToken = async (tokenObj) => {
    try {
        if (!accessTokenSecret) {
            throw new Error("JWT secret not defined");
        }
        const token = await jwt.sign(tokenObj, accessTokenSecret, {
            expiresIn: "20s",
        });
        return token;
    }
    catch (err) {
        throw new Error("error generating token");
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
        throw new Error("error generating token");
    }
};
export const verifyToken = async (token) => {
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