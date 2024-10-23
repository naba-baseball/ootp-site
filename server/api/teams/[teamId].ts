import type { Team } from "~~/types.js";

export default defineEventHandler(async (event) => {
    const [data] = await useDB().all<Team[]>(
        `select * from teams where team_id = $1`,
        getRouterParam(event, "teamId"),
    );
    return data;
});
