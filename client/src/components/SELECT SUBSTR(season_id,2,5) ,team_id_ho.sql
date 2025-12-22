SELECT SUBSTR(season_id,2,5) ,team_id_home as team_id , SUM(pts_home) as pts 
FROM game
WHERE SUBSTR(season_id,1,1)=2
GROUP BY team_id_home,season_id
UNION ALL
SELECT SUBSTR(season_id,2,5) ,team_id_away as team_id , SUM(pts_away) as pts 
FROM game
WHERE SUBSTR(season_id,1,1)=2
GROUP BY team_id_away,season_id


SELECT season_id ,team_id_home from game ORDER BY season_id DESC  limit 20 ;

SELECT SUBSTR(season_id,2,5) ,team_id_home as team_id , SUM(pts_home) as pts 
FROM game
GROUP BY pts_home

SELECT 
g.team_id ,
SUM(g.pts) as points 
FROM(
    SELECT team_id_home as team_id , SUM(pts_home) as pts 
    FROM game
    GROUP BY team_id_home
    UNION ALL
    SELECT team_id_away as team_id , SUM(pts_away) as pts 
    FROM game
    GROUP BY team_id_away 
) as g
LEFT JOIN team  t 
ON g.team_id = t.id 
GROUP BY g.team_id
ORDER BY points DESC
LIMIT 1;

SELECT 
g.team_id ,
SUM(g.pts) as points 
FROM(
    SELECT team_id_home as team_id , SUM(pts_home) as pts 
    FROM game
    GROUP BY team_id_home
    UNION ALL
    SELECT team_id_away as team_id , SUM(pts_away) as pts 
    FROM game
    GROUP BY team_id_away 
) as g
LEFT JOIN team  t 
ON g.team_id = t.id 
GROUP BY g.team_id
ORDER BY points DESC
LIMIT 1;

-- export type Team = {
--   team_id: string;
--   nickname: string;
--   abbreviation: string;
--   yearfounded: number;
--   city: string;
--   arena: string;
--   arenacapacity: string;
--   owner: string;
--   headcoach: string;
-- };

SELECT 
team_id,
nickname,
abbreviation,
yearfounded,
city,
arena,
arenacapacity,
owner,
headcoach
FROM team_details
WHERE team_id = 1610612747

SELECT 
SUBSTR(season_id,2,4) AS season,
AVG(pts_home + pts_away) as total_points,
AVG(pts_home) as home_points,
AVG(pts_away) as away_points,
COUNT(*)
FROM game
WHERE SUBSTR(season_id,1,1) = 2
GROUP BY season_id

SELECT 
  p.full_name,
  p.id as player_id,
  cpi.position,
  cpi.team_abbreviation,
  COUNT(DISTINCT pbp.game_id) as games_played,
  SUM(CASE 
    WHEN pbp.eventmsgtype = 1 THEN 
      CASE 
        WHEN pbp.homedescription LIKE '%3PT%' 
          OR pbp.visitordescription LIKE '%3PT%' THEN 3
        ELSE 2
      END
    WHEN pbp.eventmsgtype = 3 
      AND (pbp.homedescription LIKE '%PTS)%' 
           OR pbp.visitordescription LIKE '%PTS)%') THEN 1
    ELSE 0
  END) as total_points
FROM player p
JOIN play_by_play pbp ON p.id = pbp.player1_id
LEFT JOIN common_player_info cpi ON p.id = cpi.person_id
WHERE pbp.eventmsgtype IN (1, 3)
GROUP BY p.id, p.full_name, cpi.position, cpi.team_abbreviation
ORDER BY total_points DESC
LIMIT 10;


SELECT 

  team_id,
  abbreviation,
  nickname,
  yearfounded,
  city,
  arena,
  arenacapacity,
  owner,
  generalmanager,
  headcoach
FROM team_details;

head -2 all_seasons.csv                                                                                           ✔ ▓▒░
id,player_name,team_abbreviation,age,player_height,player_weight,college,country,draft_year,draft_round,draft_number,gp,pts,reb,ast,net_rating,oreb_pct,dreb_pct,usg_pct,ts_pct,ast_pct,season
0,Randy Livingston,HOU,22.0,193.04,94.800728,Louisiana State,USA,1996,2,42,64,3.9,1.5,2.4,0.3,0.042,0.071,0.16899999999999998,0.48700000000000004,0.248,1996-97

CREATE TABLE players_season_stats (
    id INT,
    player_name VARCHAR(100),
    team_abbreviation CHAR(3),
    age FLOAT NULL,
    player_height FLOAT NULL,
    player_weight FLOAT NULL,
    college VARCHAR(100),
    country VARCHAR(50),
    draft_year INT NULL,
    draft_round INT NULL,
    draft_number INT NULL,
    gp INT,
    pts FLOAT NULL,
    reb FLOAT NULL,
    ast FLOAT NULL,
    net_rating FLOAT NULL,
    oreb_pct FLOAT NULL,
    dreb_pct FLOAT NULL,
    usg_pct FLOAT NULL,
    ts_pct FLOAT NULL,
    ast_pct FLOAT NULL,
    season VARCHAR(7)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


LOAD DATA INFILE  '/var/lib/mysql-files/all_seasons.csv'
INTO TABLE players_season_stats 
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(
 id, player_name, team_abbreviation, age, player_height, player_weight,
 college, country,
 @draft_year, @draft_round, @draft_number,
 gp, pts, reb, ast, net_rating,
 oreb_pct, dreb_pct, usg_pct, ts_pct, ast_pct, season
)
SET
 draft_year   = NULLIF(@draft_year, 'Undrafted'),
 draft_round  = NULLIF(@draft_round, 'Undrafted'),
 draft_number = NULLIF(@draft_number, 'Undrafted');




CREATE TABLE teams_season_stats (
    teamstatspk INT,
    team VARCHAR(50),
    games_played INT,
    wins INT,
    losses INT,
    win_percentage FLOAT,
    minutes INT,
    points INT,
    field_goals_made INT,
    field_goals_attempted INT,
    field_goal_percentage FLOAT,
    three_pointers_made INT,
    three_pointers_attempted INT,
    three_point_percentage FLOAT,
    free_throws_made INT,
    free_throw_attempted INT,
    free_throw_percentage FLOAT,
    offensive_rebounds INT,
    defensive_rebounds INT,
    rebounds INT,
    assists INT,
    turnovers INT,
    steals INT,
    blocks INT,
    blocks_attempted INT,
    personal_fouls INT,
    personal_fouls_drawn INT,
    plus_minus INT,
    season VARCHAR(7)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


LOAD DATA INFILE '/var/liv/mysql-files/nba_team_stats_00_to_23.csv'
INTO TABLE teams_season_stats
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(
 teamstatspk, team, games_played, wins, losses, win_percentage,
 minutes, points, field_goals_made, field_goals_attempted,
 field_goal_percentage, three_pointers_made, three_pointers_attempted,
 three_point_percentage, free_throws_made, free_throw_attempted,
 free_throw_percentage, offensive_rebounds, defensive_rebounds,
 rebounds, assists, turnovers, steals, blocks, blocks_attempted,
 personal_fouls, personal_fouls_drawn, plus_minus, season
);

SELECT *  SELECT p.full_name,p.is_active,cp.team_id ,td.nickname from player p 
LEFT JOIN common_player_info cp ON p.id = cp.person_id
LEFT JOIN team_details td ON td.team_id = cp.team_id 
WHERE p.is_active=1
FROM game 
WHERE team_id_away=:id or team_id_home=:id and season_type='Regular season' 
order by game_date desc limit 10;

SELECT distinct SUBSTR(season_id,2,5) from game;

SELECT distinct SUBSTR(season_id,2,5) as season_id from game WHERE team_id_home = 1610612747 OR team_id_away = 1610612747  order by SUBSTR(season_id,2,5) desc;

SELECT p.full_name,p.is_active,cp.team_id ,td.nickname,cp.position ,cp.height,cp.weight,cp.jersey,cp.country from player p 
JOIN common_player_info cp ON p.id = cp.person_id
JOIN team_details td ON td.team_id = cp.team_id 
WHERE p.is_active=1 and cp.team_id = 1610612747
limit 5;

interface TeamPlayer {
  team_id: number;
  nickname: string;
  position: string;
  height: string;
  weight: string;
  jersey: string;
  country: string;
  birthdate: string;
  first_name?: string;
  last_name?: string;
}


SELECT 
cp.team_id ,
td.nickname,
cp.first_name,
cp.last_name,
cp.position ,
cp.height,
cp.weight ,
cp.jersey,
cp.country,
SUBSTR(cp.birthdate,1,10 )as birthdate 
from common_player_info cp
JOIN team_details td 
ON td.team_id = cp.team_id 
WHERE cp.rosterstatus='Active' and cp.team_id = 1610612747;


SELECT DISTINCT
    pss.player_name,
    cp.first_name,
    cp.last_name,
    cp.position,
    pss.player_height,
    pss.player_weight,
    cp.jersey,
    pss.country,
    pss.gp,
    pss.pts,
    pss.reb,
    pss.ast,
    pss.net_rating,
    pss.ts_pct,
    pss.ast_pct,
    pss.oreb_pct,
    pss.dreb_pct,
  pss.age
FROM players_season_stats pss
LEFT JOIN common_player_info cp
  ON CONCAT(cp.first_name, ' ', cp.last_name)
     COLLATE utf8mb4_0900_ai_ci
     = pss.player_name
     COLLATE utf8mb4_0900_ai_ci
WHERE pss.season = '2022-23'
  AND pss.team_abbreviation = 'LAL';


  SELECT *
FROM teams_season_stats
WHERE season = '2022-23'
  AND team = '%Lakers%';