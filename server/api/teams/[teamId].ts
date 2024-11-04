import type { Player, PlayerCareerBattingStats, PlayerCareerPitchingStats, Team } from '~~/types.js'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'teamId')
  const { year } = await getFilterPreferences(event)
  const [[team], players, topEra, topW, topK, topAvg, topHr, topRbi] = await Promise.all([
    useDB().all<Team>(
      `select name, nickname from teams where team_id = $1`,
      teamId,
    ),
    useDB().all<Player>(`select player_id, first_name || ' ' || last_name as player_name from players where team_id = $1`, teamId),
    useDB().all<Pick<PlayerCareerPitchingStats, 'year' | 'player_id'> & { player_name: string, era: number }>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      round(9 * playerStats.r/playerStats.ip, 2) as era from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.r,
      stats.ip,
    from players_career_pitching_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    where players.role = 11 order by era asc limit 4`,
      teamId,
      year,
    ),
    useDB().all<Pick<PlayerCareerPitchingStats, 'year' | 'player_id'> & { player_name: string, w: number }>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      w from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.w,
    from players_career_pitching_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    where players.role = 11 order by w desc limit 4`,
      teamId,
      year,
    ),
    useDB().all<Pick<PlayerCareerPitchingStats, 'year' | 'player_id'> & { player_name: string, k: number }>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      k from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.k,
    from players_career_pitching_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    where players.role = 11 order by k desc limit 4`,
      teamId,
      year,
    ),
    useDB().all<Pick<PlayerCareerBattingStats, 'year' | 'player_id'> & { player_name: string, avg: number }>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      round(playerStats.h / playerStats.ab, 2) as avg from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.h,
      stats.ab
    from players_career_batting_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1 and stats.ab > 0
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    order by avg desc limit 4`,
      teamId,
      year,
    ),
    useDB().all<Pick<PlayerCareerBattingStats, 'year' | 'player_id'> & { player_name: string, hr: number }>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      hr from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.hr
    from players_career_batting_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1 and stats.ab > 0
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    order by hr desc limit 4`,
      teamId,
      year,
    ),
    useDB().all<Pick<PlayerCareerBattingStats, 'year' | 'player_id'> & { player_name: string, rbi: number }>(
      `
      select
      players.first_name || ' ' || players.last_name as player_name,
      rbi from (
      select
      stats.player_id,
      stats.team_id,
      stats.year,
      stats.rbi
    from players_career_batting_stats as stats where stats.team_id = $1 and stats.year = $2 and stats.split_id = 1 and stats.ab > 0
    ) as playerStats
    right join players on players.player_id = playerStats.player_id and players.team_id = playerStats.team_id
    order by rbi desc limit 4`,
      teamId,
      year,
    ),
  ])

  return { team: team, players, topEra, topW, topK, topAvg, topHr, topRbi }
})
