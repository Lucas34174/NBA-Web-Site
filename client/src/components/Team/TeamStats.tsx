import type { TeamFullStats } from "../../type";
import { useEffect, useState } from "react";
interface props {
  teamName: string;
}

export default function TeamStats({ teamName }: props) {
  const [stats, setStats] = useState<TeamFullStats>();
  const [yearFilter, setYearFilter] = useState("2022-23");
  console.log("teamName:" + teamName);
  const season = [];
  for (let i = 9; i < 23; i++) {
    season.unshift(2000 + i + "-" + (i + 1));
  }
  const fetchTeamStats = async (teamName: string, season: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" +
          encodeURIComponent(teamName) +
          "/" +
          season +
          "/stats"
      );
      if (!response.ok)
        throw new Error("Failed to fetch team full season stats");
      const data = await response.json();
      console.log(data);
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTeamStats(teamName, yearFilter);
  }, [teamName, yearFilter]);
  return (
    <>
      <div className="container-fluid bg-dark bg-opacity-75 p-4 rounded">
        <div className="container-fluid">
          <h1 className="fw-bold text-white text-center mb-4">Statistics</h1>
        </div>
        <div className="row g-3 align-items-end">
          {/* Filtre année */}
          <div className="col-12 col-md-3">
            <label className="form-label text-light small">Saison</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="form-select bg-dark text-light border-secondary"
            >
              {season?.map((season) => (
                <option value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-dark text-white  py-4">
        <div className="container">
          <div className="row g-4 mx-5">
            {/* 🏆 RÉSULTATS DE LA SAISON */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="bg-dark rounded-3 p-4 border border-secondary">
                  <h5 className="text-warning mb-3 text-uppercase">
                    Résultats de la saison
                  </h5>

                  <div className="row text-center text-white">
                    <div className="col">
                      <div className="fs-4 fw-bold">{stats?.wins}</div>
                      <div className="text-secondary small">Victoires</div>
                    </div>

                    <div className="col">
                      <div className="fs-4 fw-bold">{stats?.losses}</div>
                      <div className="text-secondary small">Défaites</div>
                    </div>

                    <div className="col">
                      <div className="fs-4 fw-bold">
                        {((stats?.win_percentage ?? 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-secondary small">
                        Taux de victoire
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* OFFENSE */}
            <div className="col-md-6">
              <h5 className="mb-3">Offense</h5>
              <div className="border-top border-secondary pt-2">
                {[
                  ["Field goals made", stats?.field_goals_made],
                  ["Field goals attempts", stats?.field_goals_attempted],
                  [
                    "Field goals %",
                    `${(stats?.field_goal_percentage ?? 0).toFixed(1)}%`,
                  ],

                  ["Three points made", stats?.three_pointers_made],
                  ["3 pointers attempted", stats?.three_pointers_attempted],
                  [
                    "Three point %",
                    `${(stats?.three_point_percentage ?? 0).toFixed(1)}%`,
                  ],

                  ["Free throws made", stats?.free_throws_made],
                  ["Free throw attempts", stats?.free_throw_attempted],
                  [
                    "Free throws %",
                    `${(stats?.free_throw_percentage ?? 0).toFixed(1)}%`,
                  ],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between py-2 px-2 border-secondary small  "
                  >
                    <span className="text-white fw-bold">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REBOUNDS */}
            <div className="col-md-6">
              <h5 className="mb-3">Rebounds</h5>

              <div className="border-top border-secondary pt-2">
                {[
                  ["Offensive", stats?.offensive_rebounds],
                  ["Defensive", stats?.defensive_rebounds],
                  ["Total", stats?.rebounds],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between py-2 px-2 border-secondary small"
                  >
                    <span className="text-white fw-bold">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TEAM PLAY */}
            <div className="col-md-6">
              <h5 className="mb-3">Team play</h5>
              <div className="border-top border-secondary pt-2">
                {[
                  ["Assists", stats?.assists],
                  ["Turnovers", stats?.turnovers],
                  ["Plus / Minus", stats?.plus_minus],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between py-2 px-2 border-secondary small"
                  >
                    <span className="text-white fw-bold">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DEFENSE */}
            <div className="col-md-6">
              <h5 className="mb-3">Defense</h5>

              <div className="border-top border-secondary pt-2">
                {[
                  ["Steals", stats?.steals],
                  ["Blocks", stats?.blocks],
                  ["Blocks attempted", stats?.blocks_attempted],
                  ["Personal fouls", stats?.personal_fouls],
                  ["Fouls drawn", stats?.personal_fouls_drawn],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between py-2 px-2 border-secondary small"
                  >
                    <span className="text-white fw-bold">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
