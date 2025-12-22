import { useState, useEffect } from "react";
import type { Player } from "../type";

interface props {
  onView: any;
  onSelectPlayer: any;
}
function Navbar({ onView, onSelectPlayer }: props) {
  const [player, setPlayer] = useState<Player[]>();
  const [search, setSearch] = useState("");
  const fetchPlayer = async () => {
    try {
      const response = await fetch("http://localhost:7000/navbar/player");
      if (!response.ok) throw new Error("Failed to fetch players list");
      const data = await response.json();
      setPlayer(data);
      console.log("Navabar");
      console.log(data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch("http://localhost:7000/player/list");
    fetchPlayer();
  }, []);

  const filtered = player?.filter((p) =>
    (p.first_name + " " + p.last_name)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // console.log(player[0].first_name ?? " Booooom");
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <img
              src="https://brandlogos.net/wp-content/uploads/2025/04/nba-logo_brandlogos.net_ipeky.png"
              alt="NBA"
              height="30"
              onClick={() => onView("home")}
            />
          </a>

          <div className="position-relative  mx-3" style={{ minWidth: "50vh" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="form-control bg-dark text-white border border-secondary"
            />
            {search && (
              <div
                className="position-absolute w-100 mt-1 bg-dark border border-secondary rounded overflow-auto"
                style={{ maxHeight: "240px", zIndex: 1000 }}
              >
                {filtered?.map((player, i) => (
                  <div className="col-8 ">
                    <div
                      key={i}
                      className="fw-semibold text-white"
                      onClick={() => {
                        onSelectPlayer(
                          player.first_name + " " + player.last_name
                        );
                        setSearch("");
                      }}
                    >
                      {player.first_name + " " + player.last_name}
                    </div>
                    <div className=" text-center d-flex">
                      <span className="text-secondary ms-2">
                        {player.position}{" "}
                      </span>
                    </div>
                  </div>
                ))}
                {filtered?.length === 0 && (
                  <div className="p-2 text-muted">Aucun résultat</div>
                )}
              </div>
            )}
          </div>

          <ul className="nav nav-tabs mb-0">
            <li className="nav-item" onClick={() => onView("home")}>
              <a className="nav-link text-white" href="#">
                Home
              </a>
            </li>
            <li className="nav-item" onClick={() => onView("team")}>
              <a className="nav-link text-white" href="#">
                Team
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
