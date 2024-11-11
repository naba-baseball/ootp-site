import { eq } from 'drizzle-orm'
import { divisions, teams } from '~~/server/drizzle/schema.js'

export default defineEventHandler(async (event) => {
  const { name, nickname, teamId } = teams
  return event.context.$db
    .select({ name, nickname, teamId, division: { name: divisions.name } })
    .from(teams)
    .leftJoin(divisions, eq(teams.divisionId, divisions.divisionId))
})
