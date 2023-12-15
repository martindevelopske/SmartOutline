import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

type tokenObj = {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
};
const tokenOptions = { expiresIn: "30d" };
export const createToken = async (tokenObj: tokenObj) => {
  try {
    if (!secret) {
      throw new Error("JWT secret not defined");
    }
    console.log(secret);

    const token = await jwt.sign(tokenObj, secret, tokenOptions);
    return token;
  } catch (err) {
    throw new Error("error generating token");
  }
};
