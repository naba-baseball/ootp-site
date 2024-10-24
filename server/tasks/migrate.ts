export default defineTask({
    async run() {
        const { default: duckdb } = await import("duckdb");
        const db = new duckdb.Database(".data/db.duckdb");
        const scaleFnTemplate = (key: string) =>
            `5 * trunc(COLUMNS('${key}')/ (50/3)) + 20`;
        const scaleFn = (key: "batting" | "pitching" | "fielding") => {
            if (key === "batting") {
                return scaleFnTemplate("batting_ratings_.+");
            }
            if (key === "pitching") {
                return scaleFnTemplate("pitching_ratings_.+");
            }
            if (key === "fielding") {
                return scaleFnTemplate("fielding_ratings_.+");
            }
        };
        const run = (str: string) => {
            const { promise, resolve, reject } = Promise.withResolvers();
            db.run(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
            return promise;
        };
        const all = (str: string) => {
            const { promise, resolve, reject } = Promise.withResolvers();
            db.all(str, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
            return promise;
        };
        await run(`create table if not exists players as from read_csv(".data/csv/players.csv", auto_type_candidates=['FLOAT','VARCHAR'])`);
        await run(`create table if not exists teams as from read_csv(".data/csv/teams.csv", auto_type_candidates=['FLOAT','VARCHAR'])`);
        await run (`create table if not exists divisions as from read_csv(".data/csv/divisions.csv", auto_type_candidates=['FLOAT','VARCHAR'])`);
        await run(`create table if not exists players_batting as select player_id,team_id,league_id,position,role,${scaleFn('batting')} from read_csv(".data/csv/players_batting.csv", auto_type_candidates=['FLOAT','VARCHAR'])`,);
        await run(`create table if not exists players_pitching as select player_id,team_id,league_id,position,role,${scaleFn('pitching')} from read_csv(".data/csv/players_pitching.csv", auto_type_candidates=['FLOAT','VARCHAR'])`,);
        await run(`create table if not exists players_fielding as select player_id,team_id,league_id,position,role,${scaleFn('fielding')} from read_csv(".data/csv/players_fielding.csv", auto_type_candidates=['FLOAT','VARCHAR'])`,);
        await run(`create table if not exists players_career_batting_stats as from read_csv(".data/csv/players_career_batting_stats.csv",  auto_type_candidates=['FLOAT','VARCHAR'])`);
        await run(`create table if not exists players_career_pitching_stats as from read_csv(".data/csv/players_career_pitching_stats.csv",  auto_type_candidates=['FLOAT','VARCHAR'])`);
        await run(`create table if not exists players_career_fielding_stats as from read_csv(".data/csv/players_career_fielding_stats.csv",  auto_type_candidates=['FLOAT','VARCHAR'])`);
        const data = await all(`select * from teams`);
        db.close();

        return { result: "success", data };
    },
});
