import { connectMongo } from "./db.js";
import { connectPostgres } from "./datasource.js";
import { env } from "../config/env.config.js";
import { AppDataSource } from "./datasource.js";
import type { EntityTarget } from "typeorm";

export const ds = AppDataSource;
export const repository = (entity: EntityTarget<any>) => {
  return ds.getRepository(entity);
};

export const dbInit = async () => {
  if (env.DATABASE === "mongodb") {
    await connectMongo();
  } else if (env.DATABASE === "postgres") {
    await connectPostgres();
  }
};
