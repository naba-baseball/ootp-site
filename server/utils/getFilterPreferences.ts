import type { H3Event } from 'h3'

export const getFilterPreferences = async (event: H3Event): Promise<{ year: number }> => {
  const session = await getUserSession(event)
  if (!session.year) {
    const res = await useDB().all<{ year: string }>(`select max(start_date) as year from '.data/csv/league_events.csv'`)
    await setUserSession(event, { year: new Date(res[0].year).getFullYear() })
  }
  return {
    year: session.year!,
  }
}
