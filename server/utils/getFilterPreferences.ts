import type { H3Event } from 'h3'
import { leagueEvents } from '../drizzle/schema.js'
import { desc } from 'drizzle-orm'

export const getFilterPreferences = async (event: H3Event): Promise<{ year: number }> => {
  const session = await getUserSession(event)
  const db = useDrizzle(event)
  if (!session.year) {
    const res = await db.select({ year: leagueEvents.startDate }).from(leagueEvents).orderBy(desc(leagueEvents.startDate)).limit(1)
    await setUserSession(event, { year: new Date(res[0].year).getFullYear() })
  }
  return {
    year: session.year!,
  }
}
