import { useEffect, useState } from "react";
import PlayerSideBar from "../components/Player/PlayerSideBar";
import PlayerSeason from "../components/Player/PlayerSeason";
import PlayerInfo from "../components/Player/PlayerInfo";

interface PropsPlayerPage {
  playerName: string;
}

export default function PlayerPage({ playerName }: PropsPlayerPage) {
  const [currentView, setCurrentView] = useState<"season" | "career" | "info">(
    "info"
  );
  return (
    <div className="row">
      <div className="col-2">
        <PlayerSideBar onView={setCurrentView} />
      </div>
      <div className="col">
        {currentView === "info" && <PlayerInfo playerName={playerName} />}
        {currentView === "season" && <PlayerSeason playerName={playerName} />}
      </div>
    </div>
  );
}
