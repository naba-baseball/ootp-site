import type { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '~~/server/drizzle/schema.ts'

const _client = drizzle({ schema, mode: 'default', connection: { uri: '' } })
declare module 'h3' {
  interface H3EventContext {
    $db: typeof _client
  }
}
export {}
