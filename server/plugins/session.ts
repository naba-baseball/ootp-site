import { desc } from 'drizzle-orm'
import { leagueEvents } from '../drizzle/schema.js'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const session = await getUserSession(event)
    const db = event.context.$db
    if (session.year == null) {
      const res = await db.select({ year: leagueEvents.startDate }).from(leagueEvents).orderBy(desc(leagueEvents.startDate)).limit(1)
      await setUserSession(event, { year: new Date(res[0].year).getFullYear() })
    }
  })
})
