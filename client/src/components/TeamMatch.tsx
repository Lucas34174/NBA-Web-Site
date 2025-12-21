import type { Game } from "../type";
import { useEffect, useState } from "react";
import MatchCard from "./MatchCard";

interface props {
  teamId: string;
}

const STEP = 10;
export default function TeamMatch({ teamId }: props) {
  const [games, setGames] = useState<Game[]>([]);
  const [visibleCount, setVisibleCount] = useState(STEP);
  const [filteredgame, setFilteredgame] = useState<Game[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [season, setSeason] = useState<string[]>([]);
  const fetchSeason = async (teamId: string) => {
    try {
      const response = await fetch("http://localhost:7000/season/" + teamId);
      if (!response.ok) throw new Error("failed to fetch team game");
      const data = await response.json();
      setSeason(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchGame = async (teamId: string) => {
    try {
      const response = await fetch("http://localhost:7000/game/" + teamId);
      if (!response.ok) throw new Error("failed to fetch team game");
      const data = await response.json();
      setGames(data);
      setVisibleCount(STEP); // reset quand team change
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGame(teamId);
    fetchSeason(teamId);
  }, [teamId]);
  useEffect(() => {
    let filtered = games;
    if (searchTerm) {
      filtered = filtered?.filter(
        (game) =>
          game.team_name_away
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          game.team_name_home
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          game.team_abbreviation_away
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          game.team_abbreviation_home
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
    if (yearFilter !== "all") {
      filtered = filtered?.filter((game) => game.season_id === yearFilter);
    }

    if (seasonFilter !== "all") {
      if (seasonFilter === "playoffs") {
        filtered = filtered?.filter((game) => game.season_type === "Playoffs");
      } else if (seasonFilter === "regular") {
        filtered = filtered?.filter(
          (game) => game.season_type === "Regular Season"
        );
      } else if (seasonFilter === "allstar") {
        filtered = filtered?.filter(
          (game) =>
            game.season_type === "All-Star" || game.season_type === "All Star"
        );
      } else if (seasonFilter === "pre") {
        filtered = filtered?.filter(
          (game) => game.season_type === "Pre Season"
        );
      }
    }

    // filtered?.sort((a, b) => {
    //   if (sortBy === "city") return a.city.localeCompare(b.city);
    //   if (sortBy === "nickname") return a.nickname.localeCompare(b.nickname);
    //   if (sortBy === "abbreviation")
    //     return a.abbreviation.localeCompare(b.abbreviation);
    //   if (sortBy === "year") return a.yearfounded - b.yearfounded;
    //   if (sortBy === "year-desc") return b.yearfounded - a.yearfounded;
    //   return 0;
    // });
    setVisibleCount(STEP);
    setFilteredgame(filtered);
  }, [games, seasonFilter, yearFilter, searchTerm]);
  return (
    <>
      <div className="container-fluid bg-dark bg-opacity-75 p-4 rounded">
        <div className="container-fluid">
          <h1 className="fw-bold text-white text-center mb-4">All Games</h1>
        </div>
        <div className="row g-3 align-items-end">
          {/* Recherche */}
          <div className="col-12 col-md-4">
            <label className="form-label text-light small">Recherche</label>
            <input
              type="text"
              placeholder="Rechercher une équipe..."
              value={searchTerm}
              className="form-control bg-dark text-light border-secondary"
              onChange={(e) =>
                setSearchTerm((e.target as HTMLInputElement).value)
              }
            />
          </div>

          {/* Filtre ville */}
          <div className="col-12 col-md-3">
            <label className="form-label text-light small">
              Type de saison
            </label>
            <select
              value={seasonFilter}
              onChange={(e) => setSeasonFilter(e.target.value)}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="all">Toutes</option>
              <option value="playoffs">Playoffs</option>
              <option value="regular">Saison Régulière</option>
              <option value="pre">Pré saison</option>
              <option value="allstar">All-Star</option>
            </select>
          </div>

          {/* Filtre année */}
          <div className="col-12 col-md-3">
            <label className="form-label text-light small">Saison</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="all">Toutes les saisons</option>
              {season?.map((season) => (
                <option value={season}>{`${season} - ${
                  parseInt(season) + 1
                }`}</option>
              ))}
            </select>
          </div>

          {/* Reset */}
          <div className="col-12 col-md-2 d-grid">
            <button
              className="btn btn-outline-light"
              onClick={() => {
                setSearchTerm("");
                // setSortBy("nickname");
                setSeasonFilter("all");
                setYearFilter("all");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div>
        {filteredgame &&
          filteredgame
            .slice(0, visibleCount)
            .map((game) => <MatchCard match={game} foot={false} />)}
      </div>

      {visibleCount < games.length && (
        <div className="text-center my-3">
          <button
            className="btn btn-outline-light"
            onClick={() => setVisibleCount((v) => v + STEP)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
