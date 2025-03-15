import TournamentGrid from "./TournamentGrid";

function Net({ setPage, teams }) {
  return <TournamentGrid teams={teams} setPage={setPage} />;
}

export default Net;