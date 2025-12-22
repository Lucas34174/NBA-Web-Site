interface PropsSideBar {
  onView: any;
}

export default function PlayerSideBar({ onView }: PropsSideBar) {
  return (
    <nav className="navbar bg-dark bg-opacity-75 flex-column p-3 vh-100">
      <ul className="nav  navbar-nav mt-5   ">
        <li className="nav-item px-5" onClick={() => onView("info")}>
          <a className="nav-link text-white" href="#">
            Info
          </a>
        </li>
        {/* Season */}
        <li
          className="nav-item px-5  border-start"
          onClick={() => onView("season")}
        >
          <a className="nav-link text-white " href="#">
            Season
          </a>
        </li>
      </ul>
    </nav>
  );
}
