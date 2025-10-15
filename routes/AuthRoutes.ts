import express from "express";
import bcrypt from "bcrypt";
import { User } from "../entities/User.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import z, { flattenError } from "zod";
import { ds } from "../lib/index.js";
import { repository } from "../lib/index.js";

const AuthRouter = express.Router();
const session_secret: string = env.SESSION_SECRET;

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const registerSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
    age: z.number(),
  })
  .superRefine((data, error) => {
    if (data.password !== data.confirm_password) {
      return error.addIssue("Passwords do not match");
    }
  });

const UserRepository = repository(User);

AuthRouter.post("/login", async (req, res) => {
  const data = loginSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      success: false,
      message: flattenError(data.error),
    });
  }

  const { email, password } = data.data;

  const user = await UserRepository.findOneBy({ email: email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  const hashedPassword: string = user.password as string;

  const isMatch = user.password
    ? await bcrypt.compare(password, hashedPassword)
    : false;

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  const verifiedUser = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token =
    jwt.sign({ id: user._id, email: user.email }, session_secret, {
      expiresIn: env.EXPIRATION,
    }) ?? false;

  if (!token) {
    return res.status(500).json({
      success: false,
      message: "Error generating token",
    });
  }

  return res.status(200).json({
    success: true,
    user: verifiedUser,
    token: token,
  });
});

AuthRouter.post("/register", async (req, res) => {
  const data = await registerSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      success: false,
      message: flattenError(data.error),
    });
  }

  const { name, email, password, confirm_password, age } = data.data;

  if (!name || !email || !password || !confirm_password || !age) {
    return res.json({
      success: false,
      message: "Fields cannot be empty",
    });
  }

  if (password !== confirm_password) {
    return res.json({
      success: false,
      message: "passwords do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserRepository.create({
    name: name,
    email: email,
    password: hashedPassword,
    age: age,
  });

  UserRepository.save(user);

  return res.status(200).json({
    success: true,
    user: user,
  });
});

export default AuthRouter;
