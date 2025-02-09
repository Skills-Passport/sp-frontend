import { UserType } from "@/types/auth";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const createUserToken = async (data: JWTPayload): Promise<string> => {
  return new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1y") // 1 año
    .sign(secretKey);
}

export const verifyUserToken = async (token: string): Promise<UserType | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload?.data as unknown as UserType;
  } catch (e) {
    console.log("Error while verifying token: ", e);
    return null;
  }
}