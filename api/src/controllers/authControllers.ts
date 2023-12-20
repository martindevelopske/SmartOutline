import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import joi from "joi";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../helpers/Tokens.js";
import { type } from "os";
import jwt from "jsonwebtoken";

const refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;
const prisma = new PrismaClient();

const signupSchema = joi.object<User>({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().alphanum().required(),
  accessToken: joi.string(),
  refreshToken: joi.string(),
});
const signinSchema = joi.object<User>({
  email: joi.string().required().email(),
  password: joi.string().alphanum().required(),
});
export const signup = async (req: Request, res: Response) => {
  try {
    await prisma.user.deleteMany();
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Missing request body");
    }
    let { firstname, lastname, email, password }: User = req.body;
    //validate body
    const status = signupSchema.validate(req.body);
    if (status.error)
      throw new Error("Please ensure the request body is correct");

    // password hash
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(password, saltRounds);
    password = passwordHashed;
    //new obj
    const userObj = { firstname, lastname, email, password } as User;

    //create user
    const user = (await prisma.user.create({ data: userObj })) as User;
    let {
      password: userpass,
      accessToken: aT,
      refreshToken: RT,
      createdAt,
      ...tokenObj
    } = user;
    //const token = await createToken(tokenObj);

    //create access token
    const accessToken = await createAccessToken(tokenObj);

    //create refresh token
    const refreshToken = await createRefreshToken(tokenObj);

    //update DB with access and refresh tokens
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: accessToken, refreshToken: refreshToken },
    });
    //create cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    //return redacted user.
    let {
      password: pass,

      ...redactedUser
    } = updatedUser;
    res.status(200).json({
      message: "Account creation successfull",
      user: redactedUser,
      token: accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const refresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    console.log(cookies);

    if (!cookies?.jwt) {
      throw new Error("Unauthorized");
    }
    type isTokenValidProps = { status: boolean; token: string | null };
    const refreshToken = cookies.jwt;
    const isTokenValid: isTokenValidProps = await verifyRefreshToken(
      refreshToken
    );
    if (isTokenValid.status === false) {
      throw new Error("Forbidden request. Refresh Token not valid.");
    }
    const secret = refreshTokenSecret as string;
    await jwt.verify(refreshToken, secret, async (err: any, decoded: any) => {
      if (err) throw new Error("Invalid refresh token.");
      const currentUser = (await prisma.user.findUnique({
        where: { id: decoded.id },
      })) as User;
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized." });
      }
      const tokenObj: tokenObj = {
        id: decoded.id,
        email: decoded.email,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
      };
      const accessToken = await createAccessToken(tokenObj);
      res.json({
        message: "new access token created successfully",
        token: accessToken,
      });
    });
  } catch (err: any) {
    res.send(err.message);
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Missing request body");
    }
    let { email, password }: User = req.body;
    //validate body
    const status = signinSchema.validate(req.body);
    if (status.error)
      throw new Error("Please ensure the request body is correct");

    //find unique user
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    //match passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: "invalid password" });
    }
    let {
      password: userpass,
      accessToken: aT,
      refreshToken: RT,
      createdAt,
      ...tokenObj
    } = user;

    //create access token
    const accessToken = await createAccessToken(tokenObj);

    //create refresh token
    const refreshToken = await createRefreshToken(tokenObj);

    //update DB with access and refresh tokens
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: accessToken, refreshToken: refreshToken },
    });
    //create cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    //return redacted user.
    let {
      password: pass,

      ...redactedUser
    } = updatedUser;
    res.status(200).json({
      message: "Login successfull",
      user: redactedUser,
      token: accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const signout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "Logout successfull and cookie cleared" });
};