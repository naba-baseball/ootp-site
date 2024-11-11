import type { H3Event } from 'h3'
import { desc } from 'drizzle-orm'
import { leagueEvents } from '../drizzle/schema.js'

export const getFilterPreferences = async (event: H3Event): Promise<{ year: number }> => {
  const session = await getUserSession(event)
  const db = event.context.$db
  if (!session.year) {
    const res = await db.select({ year: leagueEvents.startDate }).from(leagueEvents).orderBy(desc(leagueEvents.startDate)).limit(1)
    await setUserSession(event, { year: new Date(res[0].year).getFullYear() })
  }
  return {
    year: session.year!,
  }
}
