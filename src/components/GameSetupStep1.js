import React, { useState, useContext } from "react";
import Map from "./Map";
import { Link } from "react-router-dom";
import { GameStateContext } from "./GameStateContext";
import "../index.css";

const GameSetupStep1 = () => {
  const { gameState } = useContext(GameStateContext);
  const [circleSize, setCircleSize] = useState(gameState.circleSize ?? 10); // default value of circle size

  const handleSliderChange = (event) => {
    setCircleSize(event.target.value);
  };

  return (
    <div className="step1-container">
      <h1 className="step1-title">Step 1</h1>
      <h2 className="step1-subtitle">Where</h2>
      <Map gameState={gameState} circleSize={circleSize} />
      <h2 className="step1-subtitle">Circle Size</h2>
      <div className="step1-slider-container">
        <input
          className="step1-slider"
          type="range"
          min="1"
          max="20"
          value={circleSize}
          onChange={handleSliderChange}
        />
        <p className="step1-slider-label">
          Distance: {circleSize} KM (approx. {circleSize * 11} min to move
          across)
        </p>
      </div>
      <div className="button-container">
        <Link to="/game-setup-2" className="button">
          Next
        </Link>
      </div>
    </div>
  );
};

export default GameSetupStep1;
