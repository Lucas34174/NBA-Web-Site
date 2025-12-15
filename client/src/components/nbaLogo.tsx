import * as Logos from "react-nba-logos";

interface props {
  team: string;
  size: string;
}

export default function NBALogo({ team, size }: props) {
  const TeamLogoComponent = (Logos as Record<string, React.ComponentType<any>>)[
    team
  ];

  return TeamLogoComponent ? <TeamLogoComponent size={size} /> : null;
}
