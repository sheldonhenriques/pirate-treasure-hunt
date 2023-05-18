import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameStateContext } from "./GameStateContext";
import "../index.css";
import { generateRandomGameId } from "../utils/helpers";

const GameSetupStep3 = () => {
  const { gameState } = useContext(GameStateContext);
  console.log(gameState);
  gameState.gameId = generateRandomGameId().toUpperCase();

  return (
    <div className="step1-container">
      <h1 className="step1-title">Step 3</h1>
      <div className="button-container">
        <Link to={`/game-details/${gameState.gameId}`} className="button">
          Next
        </Link>
      </div>
    </div>
  );
};

export default GameSetupStep3;
