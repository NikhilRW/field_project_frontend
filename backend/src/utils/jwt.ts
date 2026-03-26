import jwt from "jsonwebtoken";

export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: "Admin" | "Volunteer" | "Donor";
};

const accessSecret = process.env.JWT_SECRET ?? "dev_access_secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET ?? "dev_refresh_secret";
const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN ?? "15m";
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? "7d";

export const signAccessToken = (payload: AuthTokenPayload) => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: Number(accessExpiresIn),
  });
};

export const signRefreshToken = (payload: AuthTokenPayload) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: Number(refreshExpiresIn),
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret) as AuthTokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret) as AuthTokenPayload;
};
