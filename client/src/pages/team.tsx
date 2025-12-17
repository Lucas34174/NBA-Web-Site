import { useEffect, useState } from "react";
import type { Team } from "../type";
import TeamRow from "../components/teamRow";

export default function Team() {
  const [team, setTeam] = useState<Team[]>();
  const thead = {
    nickname: "Nickname",
    abbreviation: "Abbreviation",
    city: "City",
    yearfounded: "Founded",
    arena: "Arena",
    headcoach: "Coach",
  };

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

  useEffect(() => {
    fetchTeam();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <h1
          className="display-10 text-center
         fw-bold text-white mb-0 "
        >
          🏀 Équipes NBA
        </h1>
        <h1 className="h2 "></h1>
        <h1 className="h6 text-center fw-bold text-white fs-10 ">
          30 Équipes à travers les États-Unis
        </h1>
      </div>
      <div className="m-5">
        <TeamRow team={thead} header={true} />
        {team && team.map((team) => <TeamRow team={team} header={false} />)}
      </div>
    </>
  );
}
