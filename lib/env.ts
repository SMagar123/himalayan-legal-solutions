import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SESSION_SECRET: z.string().min(32),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
})

export const env = envSchema.parse(process.env)
