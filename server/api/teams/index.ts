import type { Team } from "~~/types.js";

export default defineEventHandler(async () => {
  await useDB().run(`create index if not exists teams_division_id on teams(division_id)`);
  await useDB().run(`create index if not exists divisions_division_id on divisions(division_id, league_id, sub_league_id)`);
  const teams = await useDB().all<( Team & {division_name: string} )[]>(
    `select t.*, d.name as division_name, from teams as t left join divisions as d on t.division_id = d.division_id and t.league_id = d.league_id and t.sub_league_id = d.sub_league_id`,
  );
  return teams;
});
