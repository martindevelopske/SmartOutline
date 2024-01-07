import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { accessTokenSecret, refreshTokenSecret } from "../envVariables.js";

const prisma = new PrismaClient();

export const createAccessToken = async (tokenObj: tokenObj) => {
  console.log(process.env.ACCESS_TOKEN_SECRET);

  try {
    if (!accessTokenSecret) {
      throw new Error("JWT secret not defined");
    }

    const token = await jwt.sign(tokenObj, accessTokenSecret, {
      expiresIn: "1d",
    });
    return token;
  } catch (err: any) {
    console.log(err.message);

    throw new Error("error generating access token");
  }
};
export const createRefreshToken = async (tokenObj: tokenObj) => {
  try {
    if (!refreshTokenSecret) {
      throw new Error("JWT secret not defined");
    }

    const token = await jwt.sign(tokenObj, refreshTokenSecret, {
      expiresIn: "10d",
    });
    return token;
  } catch (err) {
    throw new Error("error generating refresh token");
  }
};

export const verifyRefreshToken = async (
  token: string
): Promise<isTokenValidProps> => {
  const secret = refreshTokenSecret as string;

  return new Promise<isTokenValidProps>(async (resolve) => {
    jwt.verify(token, secret, async (err: any, decoded: any) => {
      if (err) {
        resolve({ status: false, token: null });
        return;
      }

      const user = (await prisma.user.findUnique({
        where: { email: decoded.email },
      })) as User;

      if (!user) {
        resolve({ status: false, token: null });
        return;
      }

      const tokenObj: tokenObj = {
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
