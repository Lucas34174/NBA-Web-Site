import { useEffect, useState } from "react";
import TeamSideBar from "./teamSideBar";
import type { TeamDetails } from "../type";
import TeamHome from "./TeamHome";
import TeamHistory from "./TeamBestPlayer";
import TeamMatch from "./TeamMatch";
import TeamPlayer from "./TeamPlayer";
import TeamStats from "./TeamStats";
interface propsTeamDetails {
  teamId: string;
  onBack: any;
}

export default function TeamDetails({ teamId, onBack }: propsTeamDetails) {
  const [team, setTeam] = useState<TeamDetails>();
  const [currentView, setCurrentView] = useState("home");
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

  useEffect(() => {
    fetchTeamCard(teamId);
  }, [teamId]);
  return (
    <div className="row">
      <div className="col-2 ">
        <TeamSideBar
          team={team?.abbreviation ?? "LAL"}
          onBack={onBack}
          onView={setCurrentView}
        />
      </div>
      <div className="col">
        {currentView === "home" && <TeamHome teamId={teamId} />}
        {currentView === "player" && (
          <TeamPlayer teamAbbr={team?.abbreviation ?? "LAL"} />
        )}
        {currentView === "match" && <TeamMatch teamId={teamId} />}
        {currentView === "stats" && (
          <TeamStats teamName={team?.nickname ?? "Lakers"} />
        )}
        {currentView === "history" && (
          <TeamHistory teamAbbr={team?.abbreviation ?? "LAL"} />
        )}
      </div>

      {/* Afficher les détails */}
    </div>
  );
}
