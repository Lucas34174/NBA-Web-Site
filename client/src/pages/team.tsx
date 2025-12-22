import { useEffect, useState } from "react";
import type { Team } from "../type";
import TeamDetails from "../components/Team/TeamDetails";
import TeamList from "../components/Team/TeamList";
interface props {
  onSelectPlayer: any;
}
export default function Team({ onSelectPlayer }: props) {
  const [team, setTeam] = useState<Team[]>();
  const [currentView, setCurrentView] = useState("list");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const fetchTeam = async () => {
    try {
      const response = await fetch("http://localhost:7000/page/team");
      if (!response.ok) throw new Error("Failed to fetch team");
      const data = await response.json();
      setTeam(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("currentView:" + currentView);
  // Charger les équipes
  useEffect(() => {
    // Fetch des équipes depuis votre API/base de données
    fetchTeam();
  }, []);

  const handleTeamClick = (teamId: string) => {
    setSelectedTeamId(teamId);
    setCurrentView("details");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedTeamId("");
  };

  return (
    <>
      {currentView === "list" ? (
        <TeamList teams={team} onTeamClick={handleTeamClick} />
      ) : (
        <TeamDetails
          teamId={selectedTeamId}
          onSelectPlayer={onSelectPlayer}
          onBack={handleBackToList}
        />
      )}
    </>
  );
}
