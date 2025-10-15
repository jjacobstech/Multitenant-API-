import jwt from "jsonwebtoken";
import type { Response, NextFunction } from "express";
import { env } from "../config/env.config.js";
import type { AuthenticatedRequest } from "../config/types.config.js";

const session_secret: string = env.SESSION_SECRET;

export const authorize = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  if (token.split(" ")[0] === "Bearer") {
    const authToken: string = token.split(" ")[1] ?? "";

    try {
      const decoded = jwt.verify(authToken, session_secret);
      req.user = decoded;
      next();
    } catch (err) {
      res
        .status(401)
        .json({ message: "Invalid token", token: token, stack_trace: err });
    }
  } else {
    try {
      const decoded = jwt.verify(token, session_secret);
      req.user = decoded;
      next();
    } catch (err) {
      res
        .status(401)
        .json({ message: "Invalid token", token: token, stack_trace: err });
    }
  }
};
