import mongoose from "mongoose";
import { env } from "../config/env.config.js";

const connectionUrl = env.MONGO_URL;

export const connectMongo = async () => {
  const database = env.DB_NAME;
  try {
    await mongoose.connect(`${connectionUrl}/${database}`);
    console.log("Database connected");
  } catch (err) {
    console.log("Error while connecting to the datbase");
    console.log("====================================");
    console.log(err);
    console.log("====================================");
  }
};
