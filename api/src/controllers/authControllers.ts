import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import joi from "joi";
const prisma = new PrismaClient();

const schema = joi.object<User>({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().alphanum().required(),
});
export const signup = async (req: Request, res: Response) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Missing request body");
    }
    let { firstname, lastname, email, password }: User = req.body;
    //validate body
    const status = schema.validate(req.body);
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

    //return redacted user.
    let { password: pass, ...redactedUser } = user;
    res
      .status(200)
      .json({ message: "Account creation successfull", user: redactedUser });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  res.send("signin.....");
};
