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
