import type { Team } from "../../type";
import type { ReactNode } from "react";
import NBALogo from "../nbaLogo";

interface props {
  team: Team;
  title?: ReactNode;
  foot?: string;
}

export default function TeamCard({ team, title, foot }: props) {
  console.log("team:" + team["abbreviation"]);
  return (
    <>
      <div className="py-4">
        <div
          className="card bg-dark text-white border border-secondary shadow-lg p-0"
          style={{
            maxWidth: "600px",
            maxHeight: "600px",
            margin: "0 auto",
            borderRadius: "12px",
            // objectFit: "fill",
          }}
        >
          <div className="card-header bg-black bg-opacity-25 text-warning fw-bold fs-5">
            {title}
          </div>
          <div className=" row card-body align-items-center p-2">
            <div className="col">
              <div className="border-end border-secondary">
                <NBALogo team={team.abbreviation} size="200px" />
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-start gap-2">
                <h6
                  className="text-uppercase text-secondary fw-semibold "
                  style={{ fontSize: "4rem" }}
                >
                  {team.abbreviation}
                </h6>
                <p className="mt-4">|</p>
                <p className="mt-4">{team.city}</p>
              </div>
              <div className="text-start gap-2">
                <div className="row ">
                  <h6 className=" col text-uppercase text-white fw-semibold fs-2 mb-2">
                    {team.nickname}
                  </h6>
                </div>
                <p className="ms-5">
                  {team.yearfounded} • {2025 - team.yearfounded} ans
                </p>
              </div>
              <div className="mb-2 d-flex border border-secondary rounded-3 px-2 py-3 mx-1">
                <div className="">
                  <div className="text-secondary text-start fw-bold ">
                    <div className="fs-9">Home Arena</div>
                    <div className="text-danger fs-4 fw-bold">{team.arena}</div>
                    <div className="fw-normal text-white">
                      capacité: {team.arenacapacity}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 row  gap-2 mx-1">
                <div className="col border border-secondary rounded-3 p-2">
                  <span className="text-secondary fw-bold ">
                    Coach
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-white fs-8 fw-bold">
                      {team.headcoach}
                    </span>
                  </span>
                </div>
                <div className="col border border-secondary rounded-3 p-2">
                  <span className="text-secondary fw-bold ">
                    Owner
                    <br />
                    {/* {cle && ":"} */}
                    <span className="text-white fs-8 fw-bold">
                      {team.owner}
                    </span>
                  </span>
                </div>
              </div>
              <div className="col ">
                <span className="text-white fs-4 fw-bold ">
                  {team.city + " " + team.nickname}
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
