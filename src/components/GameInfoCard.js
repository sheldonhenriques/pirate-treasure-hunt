import React from "react";
import "../index.css";

const GameInfoCard = ({ gameState }) => {
  const mode = gameState.mode;
  const time = gameState.time;
  return (
    <div className="game-details-info">
      <p>{`Mode - ${mode}`}</p>
      <p>{`Time - ${time} mins (approx)`}</p>
    </div>
  );
};

export default GameInfoCard;
