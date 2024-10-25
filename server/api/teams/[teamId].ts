import type { Player, PlayerCareerPitchingStats, Team } from '~~/types.js'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'teamId')
  const [[team], players, topEra] = await Promise.all([
    useDB().all<Team[]>(
      `select name, nickname from teams where team_id = $1`,
      teamId,
    ),
    useDB().all<Player[]>(
      `select player_id, first_name, last_name from players where team_id = $1`,
      teamId,
    ),
    useDB().all<Array<Pick<PlayerCareerPitchingStats, 'year' | 'player_id'> & { player_name: string, era: number }>>(
      `select players.first_name || ' ' || players.last_name as player_name, players.player_id, stats.year, 9 * stats.r/stats.ip as era 
    from players_career_pitching_stats as stats
    right join players on players.player_id = stats.player_id and players.team_id = stats.team_id 
    where stats.team_id = $1 order by year desc, r desc limit 4`,
      teamId,
    )])
  return { team, players, topEra: topEra.map(res => ({ ...res, era: Number(res.era.toFixed(2)) })) }
})
