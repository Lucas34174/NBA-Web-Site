export type Game = {
  game_id: string;
  game_date: string;
  team_name_home: string;
  team_name_away: string;
  team_abbreviation_home: string;
  season_id: string;
  team_abbreviation_away: string;
  pts_home: number;
  pts_away: number;
  wl_home: string;
  season_type: string;
  speci?: string;
};

export type Player = {
  person_id: string;
  first_name: string;
  last_name: string;
  country: string;
  height: string;
  weight: string;
  season_exp: number;
  team_name: string;
  team_abbreviation: string;
  position: string;
};

export type Team = {
  team_id?: string;
  nickname: string;
  abbreviation: string;
  yearfounded: number;
  city: string;
  arena: string;
  arenacapacity?: string;
  owner?: string;
  generalmanager?: string;
  headcoach: string;
};

export type TeamDetails = {
  id?: string;
  full_name: string;
  abbreviation: string;
  nickname: string;
  city: string;
  state: string;
  year_founded: string;
  arena: string;
  arenacapacity: string;
  owner: string;
  generalmanager: string;
  headcoach: string;
  dleagueaffiliation: string;
  facebook: string;
  instagram: string;
  twitter: string;
};

export type AVGscore = {
  season: Array<string>;
  total_points: Array<number>;
  home_points: Array<number>;
  away_points: Array<number>;
};

export type sumMatch = {
  season: Array<string>;
  match_num: Array<number>;
};

export type TeamStats = {
  total_wins: string;
  total_losses: string;
  home_wins: string;
  home_losses: string;
  away_wins: string;
  away_losses: string;
  avg_points_scored: number;
  avg_points_allowed: number;
  total_games: number;
};

export type TeamHistory = {
  team_id: string;
  city: string;
  nickname: string;
  year_founded: number;
  year_active_till: number;
};

export type TeamPlayer = {
  player_name: string;

  first_name?: string | null;
  last_name?: string | null;

  position?: string | null;

  player_height: number;
  player_weight: number;

  jersey?: string | null;
  country: string;

  gp: number;
  pts: number;
  reb: number;
  ast: number;
  age: number;
  net_rating: number;
  ts_pct: number;
  ast_pct: number;
  oreb_pct: number;
  dreb_pct: number;
};

export type TeamFullStats = {
  teamstatspk: number;
  team: string;
  games_played: number;
  wins: number;
  losses: number;
  win_percentage: number;
  minutes: number;
  points: number;
  field_goals_made: number;
  field_goals_attempted: number;
  field_goal_percentage: number;
  three_pointers_made: number;
  three_pointers_attempted: number;
  three_point_percentage: number;
  free_throws_made: number;
  free_throw_attempted: number;
  free_throw_percentage: number;
  offensive_rebounds: number;
  defensive_rebounds: number;
  rebounds: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  blocks_attempted: number;
  personal_fouls: number;
  personal_fouls_drawn: number;
  plus_minus: number;
  season: string;
};

export interface PlayerInfo {
  person_id: string;
  first_name: string;
  last_name: string;
  display_first_last: string;
  display_last_comma_first: string;
  display_fi_last: string;
  player_slug: string;
  birthdate?: string;
  school?: string;
  country?: string;
  last_affiliation?: string;
  height?: string;
  weight?: string;
  season_exp?: number;
  jersey?: string;
  position?: string;
  rosterstatus?: string;
  games_played_current_season_flag?: string;
  team_id?: number;
  team_name?: string;
  team_abbreviation?: string;
  team_code?: string;
  team_city?: string;
  playercode?: string;
  from_year?: number;
  to_year?: number;
  dleague_flag?: string;
  nba_flag?: string;
  games_played_flag?: string;
  draft_year?: string;
  draft_round?: string;
  draft_number?: string;
  greatest_75_flag?: string;
}

export type PlayerRadarData = {
  player_name: string;
  season: string;
  pts: number;
  ast: number;
  reb: number;
  ts_pct: number; // true shooting percentage (0.45 → 0.70)
  usg_pct: number; // usage percentage (10 → 40)
  net_rating: number; // impact global (-15 → +15)
};

export interface PlayerSeasonStats {
  id: number;
  player_name: string;
  team_abbreviation: string;
  age: number;
  player_height: number;
  player_weight: number;
  college: string;
  country: string;
  draft_year: number | null;
  draft_round: number | null;
  draft_number: number | null;
  gp: number;
  pts: number;
  reb: number;
  ast: number;
  net_rating: number;
  oreb_pct: number;
  dreb_pct: number;
  usg_pct: number;
  ts_pct: number;
  ast_pct: number;
  season: string;
}
