import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import joi from "joi";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../helpers/Tokens.js";
import jwt from "jsonwebtoken";
import { tokenObj } from "../types.js";

const refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;
const prisma = new PrismaClient();

const signupSchema = joi.object<User>({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  accessToken: joi.string(),
  refreshToken: joi.string(),
});
const signinSchema = joi.object<User>({
  email: joi.string().required().email(),
  password: joi.string().required(),
});
export const signup = async (req: Request, res: Response) => {
  try {
    // await prisma.user.deleteMany();
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Missing request body");
    }
    let { firstname, lastname, email, password }: User = req.body;
    //validate body
    const status = signupSchema.validate(req.body);
    if (status.error)
      throw new Error("Please ensure the request body is correct");

    //check whether user exists
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) throw new Error("User with that email already exists.");
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
      secure: false, //for dev use false
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    //return redacted user.
    let {
      password: pass,

      ...redactedUser
    } = updatedUser;
    res.status(200).json({
      success: true,
      message: "Account creation successfull",
      user: redactedUser,
      accessToken: accessToken,
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};
export const refresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      throw new Error("No cookies found");
    }
    type isTokenValidProps = { status: boolean; token: string | null };
    const refreshToken = cookies.jwt;
    const secret = refreshTokenSecret as string;
    await jwt.verify(refreshToken, secret, async (err: any, decoded: any) => {
      if (err) throw new Error("Invalid refresh token.");
      const currentUser = (await prisma.user.findUnique({
        where: { id: decoded.id },
      })) as User;
      if (!currentUser) {
        return res.status(401).json({ message: "No current user." });
      }
      const tokenObj: tokenObj = {
        id: decoded.id,
        email: decoded.email,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
      };
      const accessToken = await createAccessToken(tokenObj);

      //update new access token to db
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          accessToken: accessToken,
        },
      });
      res.json({
        success: true,
        message: "new access token created successfully",
        token: accessToken,
      });
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
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
      throw new Error("Password is not correct");
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
      accessToken: at,
      refreshToken: rt,

      ...redactedUser
    } = updatedUser;
    res.json({
      success: true,
      status: 200,
      message: "Login successfull",
      user: redactedUser,
      AccessToken: accessToken,
    });
  } catch (err: any) {
    const errMsg = err.message
      ? err.message
      : "An unexpected error occured. Please try again. ";
    return res.json({ success: false, status: 401, message: errMsg });
  }
};
export const signout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies.jwt) return res.sendStatus(204);
    const { user } = await verifyRefreshToken(cookies!.jwt);
    if (!user)
      return res.json({
        success: true,
        message: "bad request. No user detected from token",
      });

    //clear cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    //clear access token from db
    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: null },
    });
    res.json({ message: "Logout successfull and cookie cleared" });
  } catch (err: any) {
    res.json({
      success: false,
      message: err.message || "Unexpected error occured.",
    });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    let { password: pass, accessToken, refreshToken, ...redactedUser } = users;
    res.json({ sucess: true, message: users });
  } catch (err) {
    res.json({ success: false, message: null });
  }
};
