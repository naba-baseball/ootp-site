export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const session = await getUserSession(event)
    if (session.year == null) {
      const res = await useDB().all<{ year: string }>(
        `select max(start_date) as year from '.data/csv/league_events.csv'`,
      )
      await setUserSession(event, {
        year: new Date(res[0].year).getFullYear(),
      })
    }
  })
})
