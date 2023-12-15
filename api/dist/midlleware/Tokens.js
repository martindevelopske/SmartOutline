import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
const tokenOptions = { expiresIn: "30d" };
export const createToken = async (tokenObj) => {
    try {
        if (!secret) {
            throw new Error("JWT secret not defined");
        }
        console.log(secret);
        const token = await jwt.sign(tokenObj, secret, tokenOptions);
        return token;
    }
    catch (err) {
        throw new Error("error generating token");
    }
};
//# sourceMappingURL=Tokens.js.map