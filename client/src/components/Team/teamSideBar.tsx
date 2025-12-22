import NBALogo from "../nbaLogo";

interface props {
  team: string;
  onBack: any;
  onView: any;
}

export default function TeamSideBar({ team, onBack, onView }: props) {
  return (
    <>
      <nav className="navbar  bg-dark bg-opacity-75">
        <div className="container-fluid">
          <div className="container-fluid">
            <button onClick={onBack} className="btn btn-outline-light">
              ← Retour
            </button>
          </div>
          <ul className="nav  navbar-nav mt-5   ">
            <li className="nav-item px-5" onClick={() => onView("home")}>
              <a className="nav-link text-white" href="#">
                <NBALogo team={team} size="90px" />
              </a>
            </li>
            <li
              className="nav-item px-5  border-start"
              onClick={() => onView("match")}
            >
              <a className="nav-link text-white " href="#">
                Team Match
              </a>
            </li>
            <li className="nav-item px-5 " onClick={() => onView("player")}>
              <a className="nav-link text-white disabled" aria-disabled="true">
                Team Player
              </a>
            </li>
            <li className="nav-item px-5 " onClick={() => onView("stats")}>
              <a className="nav-link disabled text-white " aria-disabled="true">
                Statistics
              </a>
            </li>
            <li className="nav-item px-5 " onClick={() => onView("history")}>
              <a className="nav-link disabled text-white " aria-disabled="true">
                Best Player
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
