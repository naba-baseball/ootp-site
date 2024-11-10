import {
  players,
  playersCareerBattingStats as batting,
  playersCareerPitchingStats as pitching,
  teams,
} from "~~/server/drizzle/schema.js";
import { and, asc, desc, eq, gt, sql } from "drizzle-orm";
import { MySqlSelectBuilder } from "drizzle-orm/mysql-core";

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, "teamId"));
  const { year } = await getFilterPreferences(event);
  const db = useDrizzle(event);
  const playerData = () => ({
    playerName: sql`concat(${players.firstName}, ' ', ${players.lastName})`,
    playerId: players.playerId,
  });
  const [[team], playersRes, topEra, topW, topK, topAvg, topHr, topRbi] =
    await Promise.all([
      db.select({ name: teams.name, nickname: teams.nickname }).from(teams)
        .where(eq(teams.teamId, teamId)),
      db.select(playerData())
        .from(players).where(eq(players.teamId, teamId)),
      // ERA
      db.select({
        ...playerData(),
        era: sql`cast(round(9 * ${pitching.r}/${pitching.ip}, 2) as float)`.as(
          "era",
        ),
      }).from(pitching)
        .rightJoin(
          players,
          and(eq(pitching.playerId, players.playerId), eq(players.role, 11)),
        )
        .where(
          and(
            eq(pitching.teamId, teamId),
            eq(pitching.splitId, 1),
            eq(pitching.year, year),
          ),
        )
        .orderBy(asc(sql`era`)).limit(4),
      // W
      db.select({
        ...playerData(),
        w: pitching.w,
      }).from(pitching)
        .rightJoin(
          players,
          and(eq(pitching.playerId, players.playerId), eq(players.role, 11)),
        )
        .where(
          and(
            eq(pitching.teamId, teamId),
            eq(pitching.splitId, 1),
            eq(pitching.year, year),
          ),
        )
        .orderBy(asc(pitching.w)).limit(4),
      // K
      db.select({
        ...playerData(),
        k: pitching.k,
      }).from(pitching)
        .rightJoin(
          players,
          and(eq(pitching.playerId, players.playerId), eq(players.role, 11)),
        )
        .where(
          and(
            eq(pitching.teamId, teamId),
            eq(pitching.splitId, 1),
            eq(pitching.year, year),
          ),
        )
        .orderBy(asc(pitching.k)).limit(4),
      // AVG
      db.select({
        ...playerData(),
        avg: sql`cast(round(${batting.h} / ${batting.ab}, 3) as float)`.as(
          "avg",
        ),
      })
        .from(batting)
        .rightJoin(
          players,
          and(eq(batting.playerId, players.playerId)),
        )
        .where(
          and(
            eq(batting.teamId, teamId),
            eq(batting.splitId, 1),
            eq(batting.year, year),
            gt(batting.ab, 10),
          ),
        )
        .orderBy(desc(sql`avg`)).limit(4),
      // HR
      db.select({
        ...playerData(),
        hr: batting.hr,
      })
        .from(batting)
        .rightJoin(
          players,
          and(eq(batting.playerId, players.playerId)),
        )
        .where(
          and(
            eq(batting.teamId, teamId),
            eq(batting.splitId, 1),
            eq(batting.year, year),
            gt(batting.ab, 10),
          ),
        )
        .orderBy(desc(batting.hr)).limit(4),
      // RBI
      db.select({
        ...playerData(),
        rbi: batting.rbi,
      })
        .from(batting)
        .rightJoin(
          players,
          and(eq(batting.playerId, players.playerId)),
        )
        .where(
          and(
            eq(batting.teamId, teamId),
            eq(batting.splitId, 1),
            eq(batting.year, year),
            gt(batting.ab, 10),
          ),
        )
        .orderBy(desc(batting.rbi)).limit(4),
    ]);

  return {
    team,
    players: playersRes,
    topEra,
    topW,
    topK,
    topAvg,
    topHr,
    topRbi,
  };
});
