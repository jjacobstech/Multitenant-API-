import z from "zod";
import { config } from "dotenv";
config();

const environment = ["production", "staging", "development"] as const;
const databases = ["mongodb", "postgres"] as const;

const envSchema = z.object({
  APP_NAME: z.string(),
  APP_ENV: z.enum(environment),
  API_PREFIX: z.string(),
  PORT: z.coerce.number().default(3000),
  SESSION_SECRET: z.string(),
  EXPIRATION: z.string().default("7d"),
  MONGO_URL: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DATABASE: z.enum(databases),
});

const EnvConfig = () => {
  const app_env = process.env;
  const parsedEnv = envSchema.safeParse(app_env);

  if (parsedEnv.success) {
    const env: Env = parsedEnv.data;

    return env;
  } else {
    console.log(parsedEnv.error);
    throw new Error("Error parsing environment variables");
  }
};

export type Env = z.infer<typeof envSchema>;
export const env = EnvConfig();
