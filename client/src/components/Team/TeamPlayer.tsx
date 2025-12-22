import type { TeamPlayer } from "../../type";
import { useEffect, useState } from "react";
interface props {
  teamAbbr: string;
}

export default function TeamPlayer({ teamAbbr }: props) {
  const [players, setPlayer] = useState<TeamPlayer[]>([]);
  const [yearFilter, setYearFilter] = useState("2022-23");

  const season = [];
  for (let i = 0; i < 23; i++) {
    season.unshift(2000 + i + "-" + (i + 1));
  }
  const fetchTeamPlayer = async (teamAbbr: string, season: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" + teamAbbr + "/" + season + "/player"
      );
      if (!response.ok) throw new Error("Failed to fetch team player");
      const data = await response.json();
      setPlayer(data);
    } catch (err) {
      console.log(err);
    }
  };
  const guards = players.filter((p) => p.position?.includes("Guard"));
  const forwards = players.filter(
    (p) => p.position?.includes("Forward") || p.position?.includes("Center")
  );
  const other = players.filter((p) => p.position === null);
  const PlayerRow = ({ player }: { player: TeamPlayer }) => {
    return (
      <div className="row align-items-center px-3 py-2 mb-2 rounded player-row">
        {/* Jersey */}

        {/* Player */}
        <div className="col-8 ">
          <div className="fw-semibold text-white">{player.player_name}</div>
          <div className=" text-center d-flex">
            {player.jersey && (
              <span className="text-secondary fs-6 ">{player.jersey} </span>
            )}
            <span className="text-secondary ms-2">{player.position} </span>
          </div>
        </div>

        {/* Country */}
        <div className="col-1 text-center text-white">{player.country}</div>

        {/* Height */}
        <div className="col-1 text-center text-white d-none d-md-block">
          {player.player_height.toFixed(1)}
        </div>

        <div className="col-1 text-center text-white d-none d-lg-block">
          {player.player_weight.toFixed(1)}
        </div>

        {/* Age */}
        <div className="col-1 col-md-1 text-center text-white">
          {player.age}
        </div>
      </div>
    );
  };

  const TableSection = ({
    title,
    playersList,
  }: {
    title: string;
    playersList: TeamPlayer[];
  }) => {
    return (
      <div className="bg-dark rounded-3 p-4 mb-4">
        <h3 className="text-white pb-3 mb-4 border-bottom border-secondary fs-5 fw-semibold">
          {title}
        </h3>

        <div className="row px-3 pb-2 mb-3 border-bottom border-secondary text-uppercase small fw-semibold text-secondary">
          <div className="col-8 ">Player</div>
          <div className="col-1  text-center">Country</div>
          <div className="col-1 text-center d-none d-md-block">Height(cm)</div>
          <div className="col-1 text-center d-none d-lg-block">Weight(kg)</div>
          <div className="col-1  text-center">Age(ans)</div>
        </div>
        {playersList.map((player, i) => (
          <PlayerRow key={i} player={player} />
        ))}
      </div>
    );
  };
  useEffect(() => {
    fetchTeamPlayer(teamAbbr, yearFilter);
  }, [teamAbbr, yearFilter]);
  return (
    <>
      <div className="container-fluid bg-dark bg-opacity-75 p-4 rounded">
        <div className="container-fluid">
          <h1 className="fw-bold text-white text-center mb-4">All Players</h1>
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

          <TableSection title="Guards" playersList={guards} />
          <TableSection title="Forwards & Centers" playersList={forwards} />
          <TableSection title="Others" playersList={other} />
          {players.length === 0 && (
            <div className="text-center py-5">
              <div className="display-1 mb-3">🏀</div>
              <p className="text-muted fs-5">No players found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
