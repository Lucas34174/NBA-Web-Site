import type { Team } from "../../type";
import TeamRow from "./teamRow";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
interface props {
  teams: Team[] | undefined;
  onTeamClick: any;
}

export default function TeamList({ teams, onTeamClick }: props) {
  const [filteredTeams, setFilteredTeams] = useState<Team[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nickname");
  const [city, setCity] = useState([]);
  const fetchCity = async () => {
    try {
      const response = await fetch("http://localhost:7000/filter/city");
      if (!response.ok) throw new Error("Failed to fetch distinct city");
      const data = await response.json();
      setCity(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCity();
  }, []);

  useEffect(() => {
    let filtered = teams;
    if (searchTerm) {
      filtered = filtered?.filter(
        (team) =>
          team.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (stateFilter !== "all") {
      filtered = filtered?.filter((team) => team.city === stateFilter);
    }

    if (yearFilter !== "all") {
      if (yearFilter === "before1950") {
        filtered = filtered?.filter((team) => team.yearfounded < 1950);
      } else if (yearFilter === "1950-1969") {
        filtered = filtered?.filter(
          (team) => team.yearfounded >= 1950 && team.yearfounded <= 1969
        );
      } else if (yearFilter === "1970-1989") {
        filtered = filtered?.filter(
          (team) => team.yearfounded >= 1970 && team.yearfounded <= 1989
        );
      } else if (yearFilter === "after1990") {
        filtered = filtered?.filter((team) => team.yearfounded >= 1990);
      }
    }

    filtered?.sort((a, b) => {
      if (sortBy === "city") return a.city.localeCompare(b.city);
      if (sortBy === "nickname") return a.nickname.localeCompare(b.nickname);
      if (sortBy === "abbreviation")
        return a.abbreviation.localeCompare(b.abbreviation);
      if (sortBy === "year") return a.yearfounded - b.yearfounded;
      if (sortBy === "year-desc") return b.yearfounded - a.yearfounded;
      return 0;
    });
    setFilteredTeams(filtered);
  }, [teams, stateFilter, yearFilter, sortBy, searchTerm]);
  return (
    <>
      <div className="container-fluid">
        <h1
          className="display-10 text-center
         fw-bold text-white mb-0 "
        >
          🏀 Équipes NBA
        </h1>
        <h1 className="h2 "></h1>
        <h1 className="h6 text-center fw-bold text-white fs-10 ">
          30 Équipes à travers les États-Unis
        </h1>
      </div>
      <div className="container-fluid bg-dark p-4 rounded">
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
            <label className="form-label text-light small">Ville</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="all">Toutes les villes</option>
              {city && city.map((city) => <option value={city}>{city}</option>)}
            </select>
          </div>

          {/* Filtre année */}
          <div className="col-12 col-md-3">
            <label className="form-label text-light small">Année</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="all">Toutes les années</option>
              <option value="before1950">Avant 1950</option>
              <option value="1950-1969">1950-1969</option>
              <option value="1970-1989">1970-1989</option>
              <option value="after1990">Après 1990</option>
            </select>
          </div>

          {/* Reset */}
          <div className="col-12 col-md-2 d-grid">
            <button
              className="btn btn-outline-light"
              onClick={() => {
                setSearchTerm("");
                setSortBy("nickname");
                setStateFilter("all");
                setYearFilter("all");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="m-5">
        <div className="row ">
          <div className="col"></div>
          {/* <NBALogo team={team.abbreviation} size="50px" /> */}

          <div className="mb-2 col-11 row bg-black bg-opacity-25 align-items-center border border-secondary rounded-3 p-3">
            <div className="col-2 border-end  border-secondary">
              <span
                className="text-warning  fw-bold"
                onClick={() => {
                  setSortBy("nickname");
                }}
              >
                City
              </span>
            </div>
            <div className="col border-end  border-secondary">
              <span
                className="text-warning  fw-bold"
                onClick={() => {
                  setSortBy("city");
                }}
              >
                Nickname
              </span>
            </div>
            <div className="col border-end  border-secondary">
              <span
                className="text-warning  fw-bold"
                onClick={() => {
                  if (sortBy === "year-desc") {
                    setSortBy("year");
                  } else {
                    setSortBy("year-desc");
                  }
                }}
              >
                Founded
              </span>
            </div>
            <div className="col border-end  border-secondary">
              <span
                className="text-warning  fw-bold"
                onClick={() => {
                  setSortBy("abbreviation");
                }}
              >
                Abbreviation
              </span>
            </div>
            <div className="col-3 border-end  border-secondary">
              <span className="text-warning  fw-bold">Arena</span>
            </div>
            <div className="col ">
              <span className="text-warning  fw-bold">Coach</span>
            </div>
          </div>
        </div>
        {filteredTeams &&
          filteredTeams.map((team) => (
            <motion.div
              style={{ cursor: "pointer" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 * 0.1 }}
            >
              <TeamRow
                team={team}
                header={false}
                onTeamInfoClick={onTeamClick}
              />
            </motion.div>
          ))}
      </div>
    </>
  );
}
