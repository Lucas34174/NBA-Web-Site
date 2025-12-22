import { useState } from "react";
import Navbar from "./components/Navbar";
import Player from "./pages/player";
import Home from "./pages/home";
import Team from "./pages/team";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "team" | "player">(
    "home"
  );

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen bg-black "
      style={{
        backgroundImage: "url('/basketball-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar
        onView={setCurrentView}
        onSelectPlayer={(playerName: string) => {
          setSelectedPlayer(playerName);
          setCurrentView("player");
        }}
      />

      {currentView === "home" && <Home />}
      {currentView === "team" && (
        <Team
          onSelectPlayer={(playerName: string) => {
            setSelectedPlayer(playerName);
            setCurrentView("player");
          }}
        />
      )}
      {currentView === "player" && selectedPlayer && (
        <Player playerName={selectedPlayer} />
      )}
    </div>
  );
}
