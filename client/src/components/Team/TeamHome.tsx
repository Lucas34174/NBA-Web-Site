import {
  type Game,
  type TeamDetails,
  type TeamHistory,
  type TeamStats,
} from "../../type";
import { useEffect, useState } from "react";
import NBALogo from "../nbaLogo";
import {
  MapPin,
  Calendar,
  Building2,
  User,
  Target,
  Briefcase,
  TrendingUp,
  Trophy,
  Frown,
  BarChart3,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { GameChart } from "../Chart";

interface props {
  teamId: string;
}

export default function TeamHome({ teamId }: props) {
  const [teamDetails, setTeamDetails] = useState<TeamDetails>();
  const [teamStats, setTeamStats] = useState<TeamStats>();
  const [teamHistory, setTeamHistory] = useState<TeamHistory[]>();
  const [teamLastGame, setTeamLastGame] = useState<Game[]>();
  const details = [
    {
      label: "Fondée",
      icon: Calendar,
      value: teamDetails?.year_founded,
      col: 4,
    },
    {
      label: "Arène",
      icon: Building2,
      value:
        teamDetails?.arena +
        " " +
        (teamDetails?.arenacapacity
          ? "(" + teamDetails.arenacapacity + ")"
          : ""),
      col: 4,
    },
    {
      label: "G-League",
      icon: Target,
      value: teamDetails?.dleagueaffiliation,
      col: 4,
    },
    {
      label: "Propriétaire",
      icon: User,
      value: teamDetails?.owner,
      col: 4,
    },
    {
      label: "Manager",
      icon: Target,
      value: teamDetails?.generalmanager,
      col: 4,
    },
    {
      label: "Head Coach",
      icon: Briefcase,
      value: teamDetails?.headcoach,
      col: 4,
    },
  ];
  const stats = [
    {
      icon: Trophy,
      value: teamStats?.total_wins ?? 0,
      label: "Victoires",
      color: "#22c55e", // green
    },
    {
      icon: Frown,
      value: teamStats?.total_losses ?? 0,
      label: "Défaites",
      color: "#ef4444", // red
    },
    {
      icon: BarChart3,
      value: teamStats?.avg_points_scored.toFixed(2) ?? 0,
      label: "Pts/Match",
      color: "#3b82f6",
    },
    {
      icon: TrendingUp,
      value:
        (
          (parseInt(teamStats?.total_wins ?? "1") /
            (teamStats?.total_games ?? 1)) *
          100
        ).toFixed(2) + " %",
      label: "Win Rate",
      color: "#a855f7",
    },
  ];
  const fetchTeamDetails = async (teamId: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" + teamId + "/details"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team details");
      }
      const data = await response.json();
      setTeamDetails(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTeamHistory = async (teamId: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" + teamId + "/history"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team history");
      }
      const data = await response.json();
      setTeamHistory(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTeamLastGame = async (teamId: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" + teamId + "/lastgame"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team last game");
      }
      const data = await response.json();
      setTeamLastGame(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTeamStats = async (teamId: string) => {
    try {
      const response = await fetch(
        "http://localhost:7000/team/" + teamId + "/stats"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch team details");
      }
      const data = await response.json();
      setTeamStats(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTeamDetails(teamId);
    fetchTeamStats(teamId);
    fetchTeamHistory(teamId);
    fetchTeamLastGame(teamId);
    // Charger les détails de l'équipe
    // fetch team details using teamId
  }, [teamId]);
  return (
    <>
      <div className="container-fluid">
        {/* <h1
          className="display-10 text-center
         fw-bold text-white mb-0 "
        >
          {teamDetails?.city + " " + teamDetails?.nickname}
        </h1> */}
        <header className="border-bottom border-dark">
          {/* Bandeau supérieur */}
          <div style={{ height: "10px" }}></div>

          <div className="bg-dark bg-opacity-75 text-white py-3">
            <div className="container">
              {/* Ligne principale */}
              <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="px-3 py-2 fw-bold fs-4"
                    style={{ letterSpacing: "1px" }}
                  >
                    <NBALogo
                      team={teamDetails?.abbreviation ?? ""}
                      size="100px"
                    />
                  </div>
                  <div>
                    <h1 className="fs-3 fw-bold mb-1">
                      {teamDetails?.full_name}
                    </h1>
                    <div className="d-flex align-items-center gap-1 text-secondary small">
                      <MapPin className="me-1" /> {teamDetails?.city},{" "}
                      {teamDetails?.state}
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  {teamDetails?.facebook && (
                    <a
                      href={teamDetails.facebook}
                      className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 border border-secondary rounded-circle p-2"
                      style={{ width: "36px", height: "36px" }}
                    >
                      <Facebook className="text-light" />
                    </a>
                  )}
                  {teamDetails?.instagram && (
                    <a
                      href={teamDetails.instagram}
                      className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 border border-secondary rounded-circle p-2"
                      style={{ width: "36px", height: "36px" }}
                    >
                      <Instagram className="text-light" />
                    </a>
                  )}
                  {teamDetails?.twitter && (
                    <a
                      href={teamDetails.twitter}
                      className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 border border-secondary rounded-circle p-2"
                      style={{ width: "36px", height: "36px" }}
                    >
                      <Twitter className="text-light" />
                    </a>
                  )}
                </div>
              </div>
              <div className="row g-3">
                {details.map(({ label, icon: Icon, value, col }, idx) => (
                  <div className={`col-12 col-md-${col}`} key={idx}>
                    <div className="d-flex align-items-center gap-2 p-2  text-truncate">
                      <Icon className="flex-shrink-0" />
                      <div className="text-truncate">
                        <span className="small text-secondary d-block">
                          {label}
                        </span>
                        <p className="mb-0 fw-semibold text-truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row g-3 m-5">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div className="col-12 col-sm-6 col-md-3" key={index}>
                      <div className=" bg-black bg-opacity-75 border border-secondary p-4 d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="mb-3">
                          <Icon
                            style={{
                              width: "40px",
                              height: "40px",
                              color: stat.color,
                            }}
                          />
                        </div>
                        <div className="fs-3 fw-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div className="small text-secondary fw-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </header>
        <div className="container-fluid bg-dark p-4">
          <div className="row">
            <div className="col-12 col-lg-8 mx-auto">
              {/* Titre de la section */}
              <div className="mb-4">
                <h2 className="h3 text-white d-flex align-items-center fw-bold gap-2 mb-4">
                  <Clock className="text-purple" size={30} />
                  Historique de l'équipe
                </h2>
              </div>
              <div className="bg-dark border border-secondary rounded p-4">
                <div className="position-relative">
                  <div
                    className="position-absolute bg-secondary"
                    style={{
                      left: "24px",
                      top: 0,
                      bottom: 0,
                      width: "3px",
                    }}
                  ></div>

                  <div className="d-flex flex-column gap-4">
                    {teamHistory &&
                      teamHistory.map((item, index) => (
                        <div
                          key={index}
                          className="position-relative"
                          style={{ paddingLeft: "64px" }}
                        >
                          {/* Point sur la timeline */}
                          <div
                            className={`position-absolute rounded-circle d-flex align-items-center   justify-content-center border border-4 ${
                              item.year_active_till >= 2019
                                ? "bg-white"
                                : "bg-secondary"
                            }`}
                            style={{
                              left: 0,
                              width: "48px",
                              height: "48px",
                            }}
                          >
                            {item.year_active_till >= 2019 && (
                              <div
                                className="bg-black rounded-circle"
                                style={{ width: "16px", height: "16px" }}
                              ></div>
                            )}
                          </div>

                          {/* Contenu */}
                          <div
                            className={`bg-black border rounded p-4 border-secondary`}
                          >
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <span
                                className={`badge text-white fw-bold "bg-secondary`}
                              >
                                {item.year_founded} -{" "}
                                {item.year_active_till === 2019
                                  ? "Présent"
                                  : item.year_active_till}
                              </span>
                              {item.year_active_till >= 2019 && (
                                <span className="badge bg-success text-success bg-opacity-25 border border-success">
                                  Équipe actuelle
                                </span>
                              )}
                            </div>

                            {/* Nom de l'équipe */}
                            <h3 className="h5 text-white fw-bold mb-2">
                              {item.city} {item.nickname}
                            </h3>
                            {/* Localisation */}
                            <div className="d-flex align-items-center gap-2 text-white">
                              <i className="bi text-white bi-geo-alt">State:</i>
                              <span className="small">{item.city}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-dark p-4">
          <div className=" mx-auto">
            {/* Titre de la section */}
            <div className="mb-4">
              <h2 className="h3 text-white d-flex justify-content-center align-items-center fw-bold gap-2 mb-4">
                Forme Récente
              </h2>
            </div>
          </div>
          <div className="">
            <GameChart
              score={teamLastGame ?? []}
              abbreviation={teamDetails?.abbreviation ?? ""}
            />
          </div>
        </div>
      </div>
    </>
  );
}
