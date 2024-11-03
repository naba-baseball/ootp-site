export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const session = await getUserSession(event)
    console.log('request session', session)
    if (session.year == null) {
      const res = await useDB().all<{ year: string }>(
        `select max(start_date) as year from '.data/csv/league_events.csv'`,
      )
      await setUserSession(event, {
        year: new Date(res[0].year).getFullYear(),
      })
    }
  })
  // sessionHooks.hook('fetch', async (session, event) => {
  //   console.log('session hook!', session)
  //   const body = await readBody(event)
  //   if (body) {
  //     await useDB().run(`update sessions set year = ? where id = ?`, Number(body.year), session.id)
  //   }
  //   const [record] = await useDB().all<{ year: number }>(
  //     `select * from sessions where id = ? limit 1`,
  //     session.id,
  //   )
  //   session.year = record.year
  // })
})
