import type { Player } from "../type";
import NBALogo from "./nbaLogo";

interface props {
  player: Player;
  title?: string;
  image?: string;
  foot?: string;
}

// interface propsPersonnal {
//   cle?: string;
//   value: string;
//   unit?: string;
// }
export default function PlayerCard({ player, title, foot, image }: props) {
  // const Personnal = ({ cle, value, unit }: propsPersonnal) => {
  //   return (
  //     <div className="my-8 border-bottom border-secondary rounded-3 ">
  //       <span className="text-secondary">
  //         {cle}
  //         <br />
  //         {/* {cle && ":"} */}
  //         <span className="text-danger f  s-4 fw-bold">{value} </span>
  //         {unit}
  //       </span>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="container-fluid py-4">
        <div
          className="card bg-dark text-white border-secondary shadow-lg p-0"
          style={{
            maxWidth: image ? "600px" : "300px",
            maxHeight: "600px",
            margin: "0 auto",
            borderRadius: "12px",
            // objectFit: "fill",
          }}
        >
          {title && (
            <div className="card-header bg-black bg-opacity-25 ">
              <h5 className=" fw-bold  my-0 text-warning  fs-5">{title}</h5>
            </div>
          )}
          <div className="card-body  row">
            {image && (
              <div className="col">
                <img
                  src={image}
                  alt="player picture"
                  className="img-fluid"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
            <div className="col flex flex-wrap justify-content-center ">
              <div>
                <NBALogo team={player.team_abbreviation} size="60" />
                <h6 className="text-uppercase text-secondary fw-semibold fs-5 mb-2">
                  {player.last_name}
                </h6>
                <h6 className=" text-white fw-semibold fs-1 mb-2">
                  {player.first_name}
                </h6>
              </div>
              <div className="mb-2 row border border-secondary rounded-3 p-3 ">
                <div className="col border-end  border-secondary">
                  <span className="text-secondary fw-bold ">
                    Weight
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-danger f  s-4 fw-bold">
                      {player.weight}
                    </span>
                  </span>
                </div>
                <div className="col border-end  border-secondary">
                  <span className="text-secondary fw-bold ">
                    Height
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-danger f  s-4 fw-bold">
                      {player.height}
                    </span>
                  </span>
                </div>
                <div className="col ">
                  <span className="text-secondary fw-bold ">
                    Country
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-danger f  s-4 fw-bold">
                      {player.country}
                    </span>
                  </span>
                </div>
              </div>
              <div className="mb-2 row border border-secondary rounded-3 p-3 ">
                <div className="col border-end  border-secondary">
                  <span className="text-secondary fw-bold ">
                    Team
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-danger f  s-4 fw-bold">
                      {player.team_abbreviation}
                    </span>
                  </span>
                </div>
                <div className="col">
                  <span className="text-secondary fw-bold ">
                    Experience
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-danger f  s-4 fw-bold">
                      {player.season_exp}
                    </span>
                  </span>
                </div>
              </div>
              <div className="col ">
                <span className="text-secondary fw-bold ">
                  Position
                  <br />
                  {/* {cle && ":"} */}
                  <span className="text-danger f  s-4 fw-bold">
                    {player.position}
                  </span>
                </span>
              </div>
            </div>
          </div>
          {foot && (
            <div className="card-footer text-warning fw-bold fs-5 bg-black bg-opacity-25">
              {foot}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
