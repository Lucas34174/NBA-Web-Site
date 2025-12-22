import { div } from "framer-motion/client";
import type { TeamPlayer } from "../../type";
import { useEffect, useState } from "react";
interface props {
  teamAbbr: string;
}

export default function TeamBestPlayer({ teamAbbr }: props) {
  const [players, setPlayer] = useState<TeamPlayer[]>([]);
  const [yearFilter, setYearFilter] = useState("2022-23");
  const season = [];
  for (let i = 9; i < 23; i++) {
    season.unshift(2000 + i + "-" + (i + 1));
  }
  const fetchTeamPlayer = async (teamAbbr: string, yearFilter: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" + teamAbbr + "/" + yearFilter + "/player"
      );
      if (!response.ok) throw new Error("Failed to fetch team player");
      const data = await response.json();
      setPlayer(data);
    } catch (err) {
      console.log(err);
    }
  };
  const points = [...players].sort((a, b) => b.pts - a.pts);
  const assist = [...players].sort((a, b) => b.ast - a.ast);
  const oreb = [...players].sort((a, b) => b.oreb_pct - a.oreb_pct);
  const totals = [...players].sort((a, b) => b.gp - a.gp);
  const tir = [...players].sort((a, b) => b.ts_pct - a.ts_pct);
  const dreb = [...players].sort((a, b) => b.dreb_pct - a.dreb_pct);
  useEffect(() => {
    fetchTeamPlayer(teamAbbr, yearFilter);
  }, [teamAbbr, yearFilter]);
  return (
    <>
      <div className="container-fluid bg-dark bg-opacity-75 p-4 rounded">
        <div className="container-fluid">
          <h1 className="fw-bold text-white text-center mb-4">Top Players</h1>
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
      <div className="bg-dark bg-opacity-75 min-vh-100 py-5">
        <div className="container">
          {/* <div className="text-center mb-5">
          <div className="display-1 mb-3">🏀</div>
          <h1 className="display-5 fw-bold text-white mb-2">Players</h1>
          <p className="text-muted">Team Roster</p>
        </div> */}

          {/* <TableSection title="Guards" playersList={guards} />
        <TableSection title="Forwards & Centers" playersList={forwards} />
        <TableSection title="Others" playersList={other} /> */}
          <div className="row">
            <div className="col">
              <div className="bg-dark rounded-3 p-4 mb-4">
                <h3 className="text-white pb-3 mb-4  d-flex justify-content-center border-bottom border-secondary fs-5 fw-semibold">
                  Points
                </h3>
                {/* <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
                <div className="col-10 ">Player</div>
                <div className="col-1  text-center">Points</div>
              </div> */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    overflowX: "clip",
                  }}
                >
                  {points.map((player, i) => (
                    <div className="row  pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-white">
                      <div className={i < 3 ? "col-10 text-warning" : "col-10"}>
                        {player.player_name}
                      </div>
                      <div className="col-1  text-center">{player.pts}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bg-dark rounded-3 p-4 mb-4">
                <h3 className="text-white pb-3 mb-4  d-flex justify-content-center border-bottom border-secondary fs-5 fw-semibold">
                  Assists
                </h3>
                {/* <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
                <div className="col-10 ">Player</div>
                <div className="col-1  text-center">Points</div>
              </div> */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    overflowX: "clip",
                  }}
                >
                  {assist.map((player, i) => (
                    <div className="row  pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-white">
                      <div className={i < 3 ? "col-10 text-warning" : "col-10"}>
                        {player.player_name}
                      </div>
                      <div className="col-1  text-center">{player.ast}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="bg-dark rounded-3 p-4 mb-4">
                <h3 className="text-white pb-3 mb-4  d-flex justify-content-center border-bottom border-secondary fs-5 fw-semibold">
                  Rebonds offensifs
                </h3>
                {/* <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
                <div className="col-10 ">Player</div>
                <div className="col-1  text-center">Points</div>
              </div> */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    overflowX: "clip",
                  }}
                >
                  {oreb.map((player, i) => (
                    <div className="row  pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-white">
                      <div className={i < 3 ? "col-10 text-warning" : "col-10"}>
                        {player.player_name}
                      </div>
                      <div className="col-1  text-center">
                        {(player.oreb_pct * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bg-dark rounded-3 p-4 mb-4">
                <h3 className="text-white pb-3 mb-4  d-flex justify-content-center border-bottom border-secondary fs-5 fw-semibold">
                  Rebonds défensifs
                </h3>
                {/* <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
                <div className="col-10 ">Player</div>
                <div className="col-1  text-center">Points</div>
              </div> */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    overflowX: "clip",
                  }}
                >
                  {dreb.map((player, i) => (
                    <div className="row  pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-white">
                      <div className={i < 3 ? "col-10 text-warning" : "col-10"}>
                        {player.player_name}
                      </div>
                      <div className="col-1  text-center">
                        {(player.dreb_pct * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="bg-dark rounded-3 p-4 mb-4">
                <h3 className="text-white pb-3 mb-4  d-flex justify-content-center border-bottom border-secondary fs-5 fw-semibold">
                  Efficacité de tir
                </h3>
                {/* <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
                <div className="col-10 ">Player</div>
                <div className="col-1  text-center">Points</div>
              </div> */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    overflowX: "clip",
                  }}
                >
                  {tir.map((player, i) => (
                    <div className="row  pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-white">
                      <div className={i < 3 ? "col-10 text-warning" : "col-10"}>
                        {player.player_name}
                      </div>
                      <div className="col-1  text-center">
                        {(player.ts_pct * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bg-dark rounded-3 p-4 mb-4">
                <h3 className="text-white pb-3 mb-4  d-flex justify-content-center border-bottom border-secondary fs-5 fw-semibold">
                  Matchs Joué
                </h3>
                {/* <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
                <div className="col-10 ">Player</div>
                <div className="col-1  text-center">Points</div>
              </div> */}
                <div
                  style={{
                    maxHeight: "120px",
                    overflowY: "scroll",
                    overflowX: "clip",
                  }}
                >
                  {totals.map((player, i) => (
                    <div className="row  pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-white">
                      <div className={i < 3 ? "col-10 text-warning" : "col-10"}>
                        {player.player_name}
                      </div>
                      <div className="col-1  text-center">{player.gp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {players.length === 0 && (
            <div className="text-center py-5">
              <div className="display-1 mb-3">🏀</div>
              <p className="text-white fw-bold fs-5">No players found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
