import { authorize } from "../middleware/authorize.js";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response } from "express";
import { Router } from "express";
import type { AuthenticatedRequest } from "../config/types.config.js";

const UserRouter = Router();

UserRouter.get(
  "/dashboard",
  authorize,
  (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    const { id, email } = req.user;
    res.json({
      success: true,
      user: {
        id: id,
        email: email,
      },
      message: "Welcome to the dashboard",
    });
  }
);

export default UserRouter;
