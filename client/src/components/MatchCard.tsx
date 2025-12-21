import type { Game } from "../type";
import { Trophy } from "lucide-react";
import NBALogo from "./nbaLogo";
interface props {
  match: Game;
  foot: boolean;
  title?: string;
}
export default function MatchCard({ match, title, foot }: props) {
  const totalPoints = match.pts_away + match.pts_home;
  const getSeasonType = (tipe: string): string => {
    const label: Record<string, string> = {
      "Regular Season": "Saison régulière",
      Playoffs: "Playoffs",
      "Pre Season": "Pré-saison",
    };
    return label[tipe] || tipe;
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div className="container py-4">
      <div
        className="card bg-dark text-white border-secondary shadow-lg"
        style={{ maxWidth: "1200px", margin: "0 auto", borderRadius: "12px" }}
      >
        {title && (
          <div className="card-header bg-black bg-opacity-25 ">
            <h5 className=" fw-bold  my-0 text-secondary">{title}</h5>
          </div>
        )}

        <div className="card-body px-4">
          <div className="row align-items-center g-3">
            {/* Away Team - Gauche */}
            <div className="col-md-3 text-start">
              <div className="text-white small mb-1">Away Team</div>
              <div className="d-flex align-items-center gap-3">
                {/* <div
                  className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px", flexShrink: 0 }}
                >
                  <span className="fw-bold fs-5 text-white">
                    {match.team_abbreviation_away ||
                      match.team_name_away.substring(0, 3).toUpperCase()}
                  </span>
                </div> */}
                <NBALogo team={match.team_abbreviation_away} size="60" />
                <div>
                  <div className="fw-bold fs-5 text-white">
                    {match.team_abbreviation_away || "AWAY"}
                  </div>
                  <div className="text-white small">{match.team_name_away}</div>
                </div>
              </div>
            </div>
            {/* Score Away */}
            <div className="col-md-2 text-center">
              <div
                className={`display-3 fw-bold ${
                  match.wl_home === "L" ? "text-success" : "text-danger"
                }`}
              >
                {match.pts_away}
              </div>
            </div>

            {/* Date et Status - Centre */}
            <div className="col-md-2 text-center">
              <div className="text-white fw-semibold mb-1">
                {formatDate(match.game_date)}
              </div>
              <div className="badge bg-danger px-3 py-2">VS</div>
              <div className="text-white small mt-2">
                {getSeasonType(match.season_type)}
              </div>
            </div>

            {/* Score Home */}
            <div className="col-md-2 text-center">
              <div
                className={`display-3 fw-bold ${
                  match.wl_home === "W" ? "text-success" : "text-danger"
                }`}
              >
                {match.pts_home}
              </div>
            </div>

            {/* Home Team - Droite */}
            <div className="col-md-3 text-end">
              <div className="text-white small mb-1">Home Team</div>
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <div>
                  <div className="fw-bold fs-5 text-white">
                    {match.team_abbreviation_home || "HOME"}
                  </div>
                  <div className="text-white small">{match.team_name_home}</div>
                </div>
                <NBALogo team={match.team_abbreviation_home} size="60" />
                {/* <div
                  className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px", flexShrink: 0 }}
                >
                  <span className="fw-bold fs-5 text-dark">
                    {match.team_abbreviation_home ||
                      match.team_name_home.substring(0, 3).toUpperCase()}
                  </span> 
                </div>*/}
              </div>
            </div>
          </div>
        </div>
        {foot && (
          <div className="card-footer bg-black bg-opacity-25">
            <div className="row g-3 text-center small">
              <div className="col">
                <div className="text-white">Points</div>
                <div className="fw-bold text-info fs-5">
                  {match.speci ? match.speci : totalPoints}
                </div>
              </div>
              <div className="col">
                <div className="text-white">Résultat</div>
                <div className="fw-bold text-white">
                  {match.wl_home === "W"
                    ? `${match.team_name_home} win`
                    : `${match.team_name_away} win`}
                  <Trophy
                    className="text-warning"
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </div>
              <div className="col">
                <div className="text-muted">Game ID</div>
                <div className="fw-bold text-secondary">{match.game_id}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
