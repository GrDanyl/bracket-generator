import { useState } from "react";
import GameCase from "./GameCase";

function TournamentGrid({ teams, setPage }) {
  const [winners, setWinners] = useState(Array(teams.length - 1).fill(""));

  const updateWinner = (index, newValue) => {
    setWinners((prevWinners) => {
      const updatedWinners = [...prevWinners];
      if (updatedWinners[index] !== newValue) {
        updatedWinners[index] = newValue;
      }
      const finalIndex = updatedWinners.length - 1;
      if (index === finalIndex - 2 || index === finalIndex - 1) {
        updatedWinners[finalIndex] = "-";
      }
      return updatedWinners;
    });
  };

  return (
    <div className="container">

      {/* 1st round */}
      <div className="section">
        <h3>Round 1</h3>
        {Array.from({ length: teams.length / 2 }, (_, key) => (
          <GameCase
            key={key}
            matchIndex={key}
            team1={teams[key * 2]}
            team2={teams[key * 2 + 1]}
            update={updateWinner}
          />
        ))}
      </div>

      {/* 2nd round */}
      <div className="section">
      <h3>Round 2</h3>
        {Array.from({ length: teams.length / 4 }, (_, key) => (
          <GameCase
            key={key + teams.length / 2}
            matchIndex={key + teams.length / 2}
            team1={winners[key * 2]}
            team2={winners[key * 2 + 1]}
            update={updateWinner}
          />
        ))}
      </div>

      {/* 3rd round (add, if teams 8 or more) */}
      {teams.length >= 8 && (
        <div className="section">
          <h3>Round 3</h3>
          {Array.from({ length: teams.length / 8 }, (_, key) => (
            <GameCase
              key={key + teams.length * 0.75}
              matchIndex={key + teams.length * 0.75}
              team1={winners[(teams.length / 2) + (key * 2)]}
              team2={winners[(teams.length / 2) + (key * 2) + 1]}
              update={updateWinner}
            />
          ))}
        </div>
      )}

      {/* 4th round (add, if teams 16) */}
      {teams.length >= 16 && (
        <div className="section">
          <h3>Round 4</h3>
          {Array.from({ length: teams.length / 16 }, (_, key) => (
            <GameCase
              key={key + teams.length * 0.875}
              matchIndex={key + teams.length * 0.875}
              team1={winners[(teams.length * 0.75) + (key * 2)]}
              team2={winners[(teams.length * 0.75) + (key * 2) + 1]}
              update={updateWinner}
            />
          ))}
        </div>
      )}
      <div className="section">
        <h2>🏆Winner: {winners[winners.length - 1] || "-"}</h2>
        <button className="return-button" onClick={() => setPage("app")}>Return</button>
      </div>
    </div>
  );
}

export default TournamentGrid;
