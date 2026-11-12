import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"
import { env } from "@/lib/env"

const globalForDb = globalThis as unknown as {
  postgresClient: postgres.Sql | undefined
}

const client =
  globalForDb.postgresClient ??
  postgres(env.DATABASE_URL, {
    prepare: false,
    max: 10,
  })

if (env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client
}

export const db = drizzle(client, { schema })
