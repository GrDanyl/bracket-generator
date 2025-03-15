import React, { useState } from "react";

function GameCase({ matchIndex, team1, team2, update }) {
  const [winner, setWinner] = useState(null);

  const handleWin = (team) => {
    if (winner === team) {
      setWinner("");
      update(matchIndex, "");
    } else {
      setWinner(team);
      update(matchIndex, team);
    }
  }

  return (
    <div className="game">
      <div className="game-team">{team1 || "-"}</div>
      <button
        className="game-button"
        style={{ backgroundColor: winner === team1 ? "green" : winner === team2 ? "red" : "gray" }}
        onClick={() => handleWin(team1)}
      ></button>
      <div className="game-team">{team2 || "-"}</div>
      <button
        className="game-button"
        style={{ backgroundColor: winner === team2 ? "green" : winner === team1 ? "red" : "gray" }}
        onClick={() => handleWin(team2)}
      ></button>
    </div>
  );
}

export default GameCase;
