import { useState, useEffect } from "react";
import type { PlayerInfo, PlayerRadarData } from "../../type";
import { RadarChart } from "../Chart";
interface Props {
  playerName: string;
}

export function toCm(height: string) {
  if (!height) return null;
  const [feet, inches] = height.split("-").map(Number);
  const totalInches = feet * 12 + inches;
  return (totalInches * 2.54).toFixed(1);
}

function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

const ranges = {
  pts: [0, 35],
  ast: [0, 12],
  reb: [0, 15],
  ts_pct: [0.45, 0.7],
  usg_pct: [10, 40],
  net_rating: [-15, 15],
};

export default function PlayerInfo({ playerName }: Props) {
  const [player, setPlayer] = useState<PlayerInfo>();
  const [radar, setRadar] = useState<PlayerRadarData>();
  const player_height = toCm(player?.height ?? "6-6");
  const fetchPlayer = async (playerName: string) => {
    try {
      const response = await fetch(
        `http://localhost:7000/player/${encodeURIComponent(playerName)}`
      );
      if (!response.ok) throw new Error("Failed to fetch player");
      const data = await response.json();
      setPlayer(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPlayerRadar = async (playerName: string) => {
    try {
      const response = await fetch(
        `http://localhost:7000/player/${encodeURIComponent(playerName)}/radar`
      );
      if (!response.ok) throw new Error("Failed to fetch player radar");
      const data = await response.json();
      setRadar(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPlayer(playerName);
    fetchPlayerRadar(playerName);
  }, [playerName]);
  if (!player) return <p>Loading player info...</p>;
  return (
    <div>
      <div className="bg-black bg-opacity-75 text-white p-3 m-4 rounded-5">
        <div className="row g-0">
          <div className="col-md-3 text-center p-3">
            <img
              src={`../../../img/${player.person_id}.png`}
              className="img-fluid rounded-4 border"
              alt={player.display_first_last}
            />
            <h4 className="mt-2 text-white">{player.display_first_last}</h4>
            <p className="text-white">
              {player.team_name} ({player.team_abbreviation})
            </p>
            <span className="badge bg-primary ">{player.position}</span>
            <span className="badge bg-secondary ms-2">#{player.jersey}</span>
          </div>

          <div className="col-md-9">
            <div className="card-body">
              <h5>Personal Info</h5>
              <table className="table text-white table-sm table-borderless">
                <tbody className="rounded-4">
                  <tr className="">
                    <td className="border-bottom border-secondary bg-black bg-opacity-75 text-white">
                      <strong>Birthdate:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {player.birthdate?.split("T")[0]}
                    </td>
                    <td className="bg-black border-bottom border-secondary bg-opacity-75 text-white">
                      <strong>Country:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {player.country}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-black bg-opacity-75 text-white border-bottom border-secondary">
                      <strong>School:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {player.school}
                    </td>
                    <td className="bg-black bg-opacity-75 text-white border-bottom border-secondary">
                      <strong>Last Affiliation:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white ">
                      {player.last_affiliation}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-black bg-opacity-75 text-white border-bottom border-secondary">
                      <strong>Height:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {player_height} cm
                    </td>
                    <td className="bg-black bg-opacity-75 text-white border-bottom border-secondary">
                      <strong>Weight:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {(parseFloat(player.weight ?? "100") * 0.453592).toFixed(
                        1
                      )}{" "}
                      kg
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-black bg-opacity-75 text-white border-bottom border-secondary">
                      <strong>Experience:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {player.season_exp} seasons
                    </td>
                    <td className="bg-black bg-opacity-75 text-white border-bottom border-secondary">
                      <strong>Roster Status:</strong>
                    </td>
                    <td className="bg-black bg-opacity-75 text-white">
                      {player.rosterstatus}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h5>Draft Info</h5>
              <p>
                Year: {player.draft_year}, Round: {player.draft_round}, Pick:{" "}
                {player.draft_number}
              </p>

              <h5>Career Info</h5>
              <p>
                From {player.from_year} to {player.to_year} &nbsp;
                {player.greatest_75_flag === "Y" && (
                  <span className="badge bg-success">Legend</span>
                )}{" "}
                &nbsp;
                {player.dleague_flag === "Y" && (
                  <span className="badge bg-warning text-white">D-League</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="fw-bold text-warning fs-2 text-center">
            Prime Saison Performance
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ maxHeight: "500px" }}
          >
            {radar && <RadarChart player={radar} />}
          </div>
          <div className="h5 text-white d-flex px-5 fs-5 badge bg-secondary justify-content-center">
            {radar &&
              radar?.season.split("-")[0] +
                " - " +
                (parseInt(radar?.season.split("-")[0] ?? "1") + 1)}
          </div>
        </div>
      </div>
    </div>
  );
}
