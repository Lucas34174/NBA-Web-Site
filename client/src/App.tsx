import { useState } from "react";
import Navbar from "./components/Navbar";
import Player from "./pages/player";
import Home from "./pages/home";
import Team from "./pages/team";
import TeamHome from "./components/Team/TeamHome";
export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "team" | "player">(
    "home"
  );
  return (
    <div
      className="min-h-screen bg-black"
      style={{
        backgroundImage: "url('/basketball-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar onView={setCurrentView}></Navbar>
      {currentView === "home" && <Home />}
      {currentView === "team" && <Team />}
      {/* <Player playerName="Nikola Jokić" /> */}
    </div>
  );
}
