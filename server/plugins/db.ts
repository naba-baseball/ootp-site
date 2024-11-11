import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '~~/server/drizzle/schema.js'

export default defineNitroPlugin((nitroApp) => {
  const db = drizzle({ schema, mode: 'default', connection: { uri: useRuntimeConfig().databaseUrl } })
  nitroApp.hooks.hook('request', (event) => {
    event.context.$db = db
  })
})
