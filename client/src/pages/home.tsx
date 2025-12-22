import { useEffect, useState } from "react";
import StatCard from "../components/statCard";
import "./home.css";
import type { Game, Player, sumMatch } from "../type";
import MatchCard from "../components/MatchCard";
import { Calendar } from "lucide-react";
import PlayerCard from "../components/PlayerCard";
import TeamCard from "../components/Team/TeamCard";
import LineChart, { sumChart as SumChart } from "../components/Chart";
import type { AVGscore } from "../type";
type greatest = {
  team_id: string;
  points: number;
};

export default function Home() {
  const [game_num, setGame_num] = useState<number>(0);
  const [team_num, setTeam_num] = useState<number>(0);
  const [player_num, setPlayer_num] = useState<number>(0);
  const [player_actif_num, setPlayer_actif_num] = useState<number>(0);
  const [player_inactif_num, setPlayer_inactif_num] = useState<number>(0);
  const [first_season, setFirst_season] = useState<number>(0);
  const [last_season, setLast_season] = useState<number>(0);
  const [total_point, setTotal_point] = useState<number>(0);
  const [history, setHistory] = useState<Game>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [maxscore, setMaxscore] = useState<Game>();
  const [bigDifference, setBigDifference] = useState<Game>();
  const [longSeason, setLongSeason] = useState<Player>();
  const [greatestTeam, setGreastestTeam] = useState<greatest>();
  const [team, setTeam] = useState();
  const [AVGTotalscore, setAvgTotalpoint] = useState<AVGscore>();
  const [matchNum, setMatchNum] = useState<sumMatch>();
  //game_id    | game_date           | team_name_home      | team_name_away  | pts_home | pts_away | wl_home | season_type

  const fetchHistoricMatch = async () => {
    try {
      const response = await fetch("http://localhost:7000/game/history");
      if (!response.ok)
        throw new Error("Failed to load historical match data...");
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMaxScoreMatch = async () => {
    try {
      const response = await fetch("http://localhost:7000/game/maxscores");
      if (!response.ok)
        throw new Error("Failed to load maxscore  match data...");
      const data = await response.json();
      setMaxscore(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBigDifferenceMatch = async () => {
    try {
      const response = await fetch("http://localhost:7000/game/bigDifference");
      if (!response.ok)
        throw new Error("Failed to load big difference  match data...");
      const data = await response.json();
      setBigDifference(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLongseason = async () => {
    try {
      const response = await fetch("http://localhost:7000/player/longSeason");
      if (!response.ok)
        throw new Error("Failed to load maxscore  match data...");
      const data = await response.json();
      setLongSeason(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGreatestTeam = async () => {
    try {
      const response = await fetch("http://localhost:7000/team/greatest");
      if (!response.ok)
        throw new Error("Failed to fetch the greatest team ever");
      const data = await response.json();
      await setGreastestTeam(data);
      return data.team_id;
      // console.log("Greatest: " + greatestTeam);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTeamCard = async (id: string) => {
    try {
      const query = "http://localhost:7000/team/" + id;
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error("Failed to fetch the team card");
      }
      const data = await response.json();
      setTeam(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAVGTotalscore = async () => {
    try {
      const response = await fetch("http://localhost:7000/stat/avgPoints");
      if (!response.ok) throw new Error("Failed to fetch AVG score");
      const data = await response.json();
      setAvgTotalpoint(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchsumMatch = async () => {
    try {
      const response = await fetch("http://localhost:7000/stat/sumMatch");
      if (!response.ok) throw new Error("Failed to fetch match's sum");
      const data = await response.json();
      setMatchNum(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    const loadGreatest = async () => {
      try {
        const id = await fetchGreatestTeam();
        await fetchTeamCard(id || "0");
      } catch (err) {
        console.log(err);
      }
    };
    fetch("http://localhost:7000/player/number")
      .then((res) => res.json())
      .then((data) => {
        setPlayer_num(parseFloat(data[0].player_num));
        setPlayer_actif_num(parseFloat(data[0].actif));
        setPlayer_inactif_num(parseFloat(data[0].inactif));
      })
      .catch((err) => console.log(err));
    fetch("http://localhost:7000/team/number")
      .then((res) => res.json())
      .then((data) => setTeam_num(parseFloat(data[0].team_num)))
      .catch((err) => console.log(err));
    fetch("http://localhost:7000/game/number")
      .then((res) => res.json())
      .then((data) => setGame_num(parseFloat(data[0].game_num)))
      .catch((err) => console.log(err));
    fetch("http://localhost:7000/game/season")
      .then((result) => result.json())
      .then((data) => {
        setFirst_season(parseFloat(data[0].first_season));
        setLast_season(parseFloat(data[0].last_season));
      });
    fetch("http://localhost:7000/game/totalpoint")
      .then((result) => result.json())
      .then((data) => setTotal_point(parseFloat(data[0].total_point)))
      .catch((err) => console.log(err));
    fetchHistoricMatch();
    fetchMaxScoreMatch();
    fetchBigDifferenceMatch();
    fetchLongseason();
    loadGreatest();
    fetchAVGTotalscore();
    fetchsumMatch();
    setLoading(false);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  if (!history) {
    console.log("Failed to fetch history match");
  } else {
    console.log(history);
  }

  if (loading) {
    return (
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <h1
          className="display-10 text-center
         fw-bold text-white mb-0 "
        >
          {"🏀 NBA from " + first_season + " to " + last_season}
        </h1>
        <h1 className="h2 "></h1>
        <h1 className="h6 text-center text-white text-secondary fs-10 ">
          {game_num} matchs • {player_num} joueurs • {team_num} équipes
        </h1>
      </div>
      <div className="statCard mb-10">
        <StatCard
          title="Total Player"
          label1="actif"
          value1={player_actif_num}
          label2="retraté"
          value2={player_inactif_num}
        />
        <StatCard
          title="Total Club"
          label1="Équipes"
          label2="NBA History"
          value1={team_num}
        />
        <StatCard
          title="Total Matchs"
          label1="Matchs"
          label2="Épique"
          value1={game_num}
        />
        <StatCard
          title="Saisons Couvertes"
          label1={first_season + " - " + last_season}
          value2={last_season - first_season}
          label2="Seasons"
        />
        <StatCard title="Points marqués" label1="panier" value1={total_point} />
      </div>
      {history && (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 mt-2  ">
          {/* En-tête */}
          <div className="text-center mb-5">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-20">
              <Calendar
                className="text-warning"
                style={{ width: "32px", height: "32px" }}
              />
              <h3 className=" fw-bold text-white mt-3">Match Historique</h3>
            </div>
            <p className="text-secondary text-white fs-5">
              Un jour comme aujourd'hui - {formatDate(history.game_date)}
            </p>
            <MatchCard match={history} foot={true} />
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 mt-20">
        {/* En-tête */}
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-20">
            <h3 className=" fw-bold text-white mb-0">
              🏆 Records & Performances légendaires
            </h3>
          </div>

          {maxscore && (
            <div className="col-12">
              <MatchCard
                match={maxscore}
                foot={true}
                title="Match avec le plus de points combinés"
              />
            </div>
          )}
          {bigDifference && (
            <div className="col-12">
              <MatchCard
                foot={true}
                match={bigDifference}
                title="Plus gros écart de score"
              />
            </div>
          )}
          <div className="row justify-content-center">
            {longSeason && (
              <div className="col-6">
                <PlayerCard
                  player={longSeason}
                  title="Le joueur ayant le plus de longevité"
                  image="/VINCE CARTER WALLPAPER.jpeg"
                  foot={longSeason.season_exp + " ans de jeu"}
                />
              </div>
            )}
            {team && (
              <div className="col-6 ">
                <TeamCard
                  team={team}
                  title="Équipe la plus dominante"
                  foot={greatestTeam?.points + " points marqué au total"}
                />
              </div>
            )}
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-20">
              <h3 className=" fw-bold text-white mb-0">
                Moyenne des scores par saisons
              </h3>
            </div>
            {AVGTotalscore && (
              <div
                className="bg-black bg-opacity-75 container-fluid"
                style={{ maxHeight: "600px", maxWidth: "1000px" }}
              >
                <LineChart average={AVGTotalscore} />
              </div>
            )}
          </div>
          {matchNum && (
            <div>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-20">
                <h3 className=" fw-bold text-white mb-0">
                  Evolution du nombre de match par saison
                </h3>
              </div>

              <div
                className="bg-black bg-opacity-75 container-fluid"
                style={{ maxHeight: "600px", maxWidth: "1000px" }}
              >
                <SumChart average={matchNum} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
