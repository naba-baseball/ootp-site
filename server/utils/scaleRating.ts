import { sql } from "drizzle-orm";

export function scaleRating(key: string){
    //sql reference: 5 * TRUNCATE( batting_ratings_overall_contact / (50/3), 0) + 20 as overall_contact,
    return sql`5 * TRUNCATE( ${key} / (50/3), 0) + 20`
}