import { AppError } from "../../pkg/error/error.js";
import { verifyToken } from "../../app/auth/utils/token.js";
import { env } from "../config/env.js";

export function guard(req, res, next) {
  try {
    const token = req.cookies?.accessToken;
    if (!token) throw new AppError("no token provided", 401);

    const payload = verifyToken(token, env.ACCESS_TOKEN_SECRET);
    req.user = { id: payload.sub, name: payload.name };
    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError("invalid or expired token", 401));
  }
}