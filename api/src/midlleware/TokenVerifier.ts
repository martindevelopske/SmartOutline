import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//verifying the access token
const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check auth header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (
      !authHeader ||
      (Array.isArray(authHeader) && authHeader[0]?.startsWith("Bearer "))
    ) {
      throw new Error("No bearer token");
    }

    const token = Array.isArray(authHeader)
      ? authHeader[0].slice(7)
      : authHeader.slice(7);
    const tokenSecret = accessTokenSecret as string;

    await jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) {
        throw new Error("Invalid Token. Error validating the Token");
      } else {
        next();
      }
    });
  } catch (err: any) {
    res.send(err.message);
  }
};
