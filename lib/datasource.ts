import { DataSource } from "typeorm";
import { env } from "../config/env.config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  logging: true,
  entities: [path.resolve(__dirname, "../entities/**/*.{js,ts}")],
  synchronize: true,
});

export const connectPostgres = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();

    console.log("Database connection established");
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};
