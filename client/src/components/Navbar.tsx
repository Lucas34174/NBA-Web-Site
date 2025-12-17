function Navbar() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://brandlogos.net/wp-content/uploads/2025/04/nba-logo_brandlogos.net_ipeky.png"
              alt="Bootstrap"
              height="30"
            />
          </a>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active " aria-current="page" href="#">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white disabled" aria-disabled="true">
                Player
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled text-white " aria-disabled="true">
                Match
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
