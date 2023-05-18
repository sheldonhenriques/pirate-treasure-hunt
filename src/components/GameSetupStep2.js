import React, { useState, useContext } from "react";
import { useGameState } from "./GameStateContext";
import { Link } from "react-router-dom";
import "../index.css";

const GameSetupStep2 = () => {
  const { gameState } = useGameState();
  const [numPlayers, setNumPlayers] = useState(gameState.numPlayers ?? 10);
  const [gameMode, setGameMode] = useState(gameState.gameMode ?? "standard");
  console.log(gameState);

  const handleNumPlayersDecrease = () => {
    if (numPlayers > 1) {
      setNumPlayers(numPlayers - 1);
    }
  };

  const handleNumPlayersIncrease = () => {
    if (numPlayers < 100) {
      setNumPlayers(numPlayers + 1);
    }
  };

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  };

  const handleNextButtonClick = () => {
    // update game state and handle next button click
    const updatedGameState = {
      ...gameState,
      numPlayers,
      gameMode,
    };
    // do something with updatedGameState
  };

  return (
    <div className="step1-container">
      <h1 className="step1-title">Step 2</h1>
      <h2 className="step1-subtitle">No of players</h2>
      <div className="step2-num-players-container">
        <button
          className="step2-num-players-button"
          onClick={handleNumPlayersDecrease}
        >
          -
        </button>
        <p className="step2-num-players-label">{numPlayers}</p>
        <button
          className="step2-num-players-button"
          onClick={handleNumPlayersIncrease}
        >
          +
        </button>
      </div>
      <h2 className="step1-subtitle">Game Mode</h2>
      <div className="step2-game-mode-container">
        <button
          className={`step2-game-mode-button ${
            gameMode === "standard" ? "active" : ""
          }`}
          value="standard"
          onClick={handleGameModeChange}
        >
          Standard
        </button>
        <button
          className={`step2-game-mode-button ${
            gameMode === "drinking" ? "active" : ""
          }`}
          value="drinking"
          onClick={handleGameModeChange}
        >
          Drinking (+18)
        </button>
      </div>
      <div className="button-container">
        <Link to="/game-setup-3" className="button">
          Next
        </Link>
      </div>
    </div>
  );
};

export default GameSetupStep2;
