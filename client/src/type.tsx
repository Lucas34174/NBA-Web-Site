export type Game = {
  game_id: string;
  game_date: string;
  team_name_home: string;
  team_name_away: string;
  team_abbreviation_home: string;
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
  yearfounded: number | string;
  city: string;
  arena: string;
  arenacapacity?: string;
  owner?: string;
  generalmanager?: string;
  headcoach: string;
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
