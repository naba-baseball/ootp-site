import { drizzle } from 'drizzle-orm/mysql2'
import type { H3Event } from 'h3'

let db: ReturnType<typeof drizzle> | null = null
export const useDrizzle = (event: H3Event) => {
  if (!db) {
    const config = useRuntimeConfig(event)
    db = drizzle(config.databaseUrl)
  }
  return db
}
