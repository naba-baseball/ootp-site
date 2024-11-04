export default defineTask({
  async run() {
    const { run } = useDB()
    const scaleFnTemplate = (key: string) =>
      `5 * trunc(COLUMNS('${key}')/ (50/3)) + 20`
    const scaleFn = (key: 'batting' | 'pitching' | 'fielding') => {
      if (key === 'batting') {
        return scaleFnTemplate('batting_ratings_.+')
      }
      if (key === 'pitching') {
        return scaleFnTemplate('pitching_ratings_.+')
      }
      if (key === 'fielding') {
        return scaleFnTemplate('fielding_ratings_.+')
      }
    }
    // csv tables
    await run(`drop table if exists players; create table players as from read_csv(".data/csv/players.csv", auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists teams; create table teams as from read_csv(".data/csv/teams.csv", auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run (`drop table if exists divisions; create table divisions as from read_csv(".data/csv/divisions.csv", auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists players_batting; create table players_batting as select player_id,team_id,league_id,position,role,${scaleFn('batting')} from read_csv(".data/csv/players_batting.csv", auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists players_pitching; create table players_pitching as select player_id,team_id,league_id,position,role,${scaleFn('pitching')} from read_csv(".data/csv/players_pitching.csv", auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists players_fielding; create table players_fielding as select player_id,team_id,league_id,position,role,${scaleFn('fielding')} from read_csv(".data/csv/players_fielding.csv", auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists players_career_batting_stats; create table players_career_batting_stats as from read_csv(".data/csv/players_career_batting_stats.csv",  auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists players_career_pitching_stats; create table players_career_pitching_stats as from read_csv(".data/csv/players_career_pitching_stats.csv",  auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)
    await run(`drop table if exists players_career_fielding_stats; create table players_career_fielding_stats as from read_csv(".data/csv/players_career_fielding_stats.csv",  auto_type_candidates=['INTEGER','DOUBLE','VARCHAR'])`)

    // app tables
    await run(`create table if not exists sessions (id varchar, year int)`)

    return { result: 'success' }
  },
})
