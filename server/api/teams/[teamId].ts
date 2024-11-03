import type { Player, PlayerCareerPitchingStats, Team } from '~~/types.js'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'teamId')
  const { year } = await getFilterPreferences(event)
  const [[team], players, topEra] = await Promise.all([
    useDB().all<Team>(
      `select name, nickname from teams where team_id = $1`,
      teamId,
    ),
    useDB().all<Player>(`select player_id, first_name || ' ' || last_name as player_name from players where team_id = $1`, teamId),
    useDB().all<Array<Pick<PlayerCareerPitchingStats, 'year' | 'player_id'> & { player_name: string, era: number }>>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      9 * playerStats.r/playerStats.ip as era from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.r,
      stats.ip,
      stats.k,
      stats.w,
    from players_career_pitching_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    where players.role = 11 order by era asc limit 4`,
      teamId,
      year,
    )])
  return { team: team!, players, topEra: topEra.map(res => ({ ...res, era: Number(res.era?.toFixed(2)) })) }
})
