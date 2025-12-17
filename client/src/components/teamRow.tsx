import type { Team } from "../type";
import NBALogo from "./nbaLogo";

interface props {
  team: Team;
  header: boolean;
}

export default function TeamRow({ team, header }: props) {
  const h = "text-warning fw-bold ";
  const d = "text-black";
  const a =
    "mb-2 col-11 row bg-black bg-opacity-25 align-items-center border border-secondary rounded-3 p-3";
  const b =
    "mb-2 row bg-white bg-opacity-75 align-items-center col-11 border border-secondary rounded-end-5 p-2";
  const e = "col ";
  const f =
    "col mb-2 row bg-white bg-opacity-25  d-flex mx-3 rounded-start-5 p-2";
  return (
    <>
      <div className="row ">
        <div className={header ? e : f}>
          <NBALogo team={team.abbreviation} size="50px" />
        </div>
        <div className={header ? a : b}>
          <div className="col-2 border-end  border-secondary">
            <span className={header ? h + " fw-bold" : d + " fw-bold"}>
              {team.city}
            </span>
          </div>
          <div className="col border-end  border-secondary">
            <span
              className={header ? " fw-bold fs-4 " + h : " fw-bold fs-4  " + d}
            >
              {team.nickname}
            </span>
          </div>
          <div className="col border-end  border-secondary">
            <span className={header ? h : d}>{team.yearfounded}</span>
          </div>
          <div className="col border-end  border-secondary">
            <span className={header ? h : d}>{team.abbreviation}</span>
          </div>
          <div className="col-3 border-end  border-secondary">
            <span className={header ? h : d}>{team.arena}</span>
          </div>
          <div className="col ">
            <span className={header ? h : d}>{team.headcoach}</span>
          </div>
        </div>
      </div>
    </>
  );
}
