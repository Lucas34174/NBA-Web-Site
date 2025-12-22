import type { PlayerSeasonStats, PlayerRadarData } from "../../type";
import { useEffect, useState } from "react";
import { RadarChart } from "../Chart";
interface Props {
  playerName: string;
}

export default function PlayerSeason({ playerName }: Props) {
  const [stats, setStats] = useState<PlayerSeasonStats>();
  const [yearFilter, setYearFilter] = useState("2022-23");
  const [season, setSeason] = useState(["2022-23"]);
  const [radar, setRadar] = useState<PlayerRadarData>();
  //   const seasons = [];
  //   for (let i = 9; i < 23; i++) {
  //     seasons.unshift(`${2000 + i}-${(i + 1).toString().slice(-2)}`);
  //   }

  // Fonction pour récupérer les stats du joueur

  const fetchPlayerRadar = async (playerName: string, season: string) => {
    try {
      const response = await fetch(
        `http://localhost:7000/player/${encodeURIComponent(
          playerName
        )}/${season}`
      );
      if (!response.ok) throw new Error("Failed to fetch player radar");
      const data = await response.json();
      setRadar(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPlayerStats = async (playerName: string, season: string) => {
    try {
      const response = await fetch(
        `http://localhost:7000/player/${encodeURIComponent(
          playerName
        )}/${encodeURIComponent(season)}/stats`
      );
      if (!response.ok) throw new Error("Failed to fetch player season stats");
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPlayerSeason = async (playerName: string) => {
    try {
      const response = await fetch(
        `http://localhost:7000/player/${encodeURIComponent(playerName)}/season`
      );
      if (!response.ok) throw new Error("Failed to fetch player season list");
      const data = await response.json();
      setSeason(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPlayerStats(playerName, yearFilter);
    fetchPlayerSeason(playerName);
    fetchPlayerRadar(playerName, yearFilter);
  }, [playerName, yearFilter]);

  return (
    <>
      <div className="container-fluid bg-dark bg-opacity-75 p-4 rounded">
        <h1 className="fw-bold text-white text-center mb-4">
          {playerName} - Season Stats
        </h1>

        {/* Filtre saison */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <label className="form-label text-light small">Saison</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="all">Toutes saisons confondus</option>
              {season.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="row g-4 mx-5">
            {/* 🏆 STATISTIQUES PRINCIPALES */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="bg-dark rounded-3 p-4 border border-secondary">
                  <h5 className="text-warning mb-3 text-uppercase">
                    Principales stats
                  </h5>
                  <div className="row text-center text-white">
                    <div className="col">
                      <div className="fs-4 fw-bold">{stats?.gp}</div>
                      <div className="text-secondary small">Matchs joués</div>
                    </div>
                    <div className="col">
                      <div className="fs-4 fw-bold">
                        {stats?.pts.toFixed(1)}
                      </div>
                      <div className="text-secondary small">Points marqués</div>
                    </div>
                    <div className="col">
                      <div className="fs-4 fw-bold">
                        {stats?.reb.toFixed(1)}
                      </div>
                      <div className="text-secondary small">Rebonds</div>
                    </div>
                    <div className="col">
                      <div className="fs-4 fw-bold">
                        {stats?.ast.toFixed(1)}
                      </div>
                      <div className="text-secondary small">
                        Passes décisives
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OFFENSE */}
            <div className="col-md-6">
              <h5 className="mb-3">Attaque</h5>
              <div className="border-top border-secondary pt-2">
                {[
                  [
                    "Taux d'utilisation",
                    `${((stats?.usg_pct ?? 1) * 100).toFixed(1)}%`,
                  ],
                  [
                    "Efficacité au tir",
                    `${((stats?.ts_pct ?? 0) * 100).toFixed(1)}%`,
                  ],
                  [
                    "Participation aux passes",
                    `${((stats?.ast_pct ?? 0) * 100).toFixed(1)}%`,
                  ],
                  ["Points", stats?.pts.toFixed(1)],
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

            {/* REBOUNDS */}
            <div className="col-md-6">
              <h5 className="mb-3">Rebonds</h5>
              <div className="border-top border-secondary pt-2">
                {[
                  [
                    "Rebonds offensifs %",
                    `${((stats?.oreb_pct ?? 1) * 100).toFixed(1)}%`,
                  ],
                  [
                    "Rebonds défensifs %",
                    `${((stats?.dreb_pct ?? 1) * 100).toFixed(1)}%`,
                  ],
                  ["Rebonds", stats?.reb.toFixed(1)],
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

            {/* IMPACT GLOBAL */}
            <div className="col-md-6">
              <h5 className="mb-3">Impact sur le jeu</h5>
              <div className="border-top border-secondary pt-2">
                <div className="d-flex justify-content-between py-2 px-2 border-secondary small">
                  <span className="text-white fw-bold">Net Rating</span>
                  <span>{stats?.net_rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {radar && (
          <div className="py-5">
            <div className="fw-bold text-warning fs-2 text-center">
              Performance
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ maxHeight: "500px" }}
            >
              <RadarChart player={radar} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
