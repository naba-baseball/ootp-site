CREATE OR REPLACE VIEW batting_ratings_normalized AS
SELECT 
    5 * TRUNCATE( batting_ratings_overall_contact / (50/3), 0) + 20 as overall_contact,
    5 * TRUNCATE( batting_ratings_overall_gap / (50/3), 0) + 20 as overall_gap,
    5 * TRUNCATE( batting_ratings_overall_eye / (50/3), 0) + 20 as overall_eye,
    5 * TRUNCATE( batting_ratings_overall_strikeouts / (50/3), 0) + 20 as overall_strikeouts,
    5 * TRUNCATE( batting_ratings_overall_power / (50/3), 0) + 20 as overall_power,
    5 * TRUNCATE( batting_ratings_overall_babip / (50/3), 0) + 20 as overall_babip,
    5 * TRUNCATE( batting_ratings_vsr_contact / (50/3), 0) + 20 as vsr_contact,
    5 * TRUNCATE( batting_ratings_vsr_gap / (50/3), 0) + 20 as vsr_gap,
    5 * TRUNCATE( batting_ratings_vsr_eye / (50/3), 0) + 20 as vsr_eye,
    5 * TRUNCATE( batting_ratings_vsr_strikeouts / (50/3), 0) + 20 as vsr_strikeouts,
    5 * TRUNCATE( batting_ratings_vsr_power / (50/3), 0) + 20 as vsr_power,
     5 * TRUNCATE( batting_ratings_vsl_contact / (50/3), 0) + 20 as vsl_contact,
    5 * TRUNCATE( batting_ratings_vsl_gap / (50/3), 0) + 20 as vsl_gap,
    5 * TRUNCATE( batting_ratings_vsl_eye / (50/3), 0) + 20 as vsl_eye,
    5 * TRUNCATE( batting_ratings_vsl_strikeouts / (50/3), 0) + 20 as vsl_strikeouts,
    5 * TRUNCATE( batting_ratings_vsl_power / (50/3), 0) + 20 as vsl_power,
     5 * TRUNCATE( batting_ratings_talent_contact / (50/3), 0) + 20 as potential_contact,
    5 * TRUNCATE( batting_ratings_talent_gap / (50/3), 0) + 20 as potential_gap,
    5 * TRUNCATE( batting_ratings_talent_eye / (50/3), 0) + 20 as potential_eye,
    5 * TRUNCATE( batting_ratings_talent_strikeouts / (50/3), 0) + 20 as potential_strikeouts,
    5 * TRUNCATE( batting_ratings_talent_power / (50/3), 0) + 20 as potential_power
    
FROM players_batting;