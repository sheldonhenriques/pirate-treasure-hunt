import React, { useState, useEffect, useContext } from "react";

const GameStateContext = React.createContext();

const GameStateProvider = (props) => {
  const [gameState, setGameState] = useState(
    JSON.parse(localStorage.getItem("gameState")) || {}
  );

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {props.children}
    </GameStateContext.Provider>
  );
};

const useGameState = () => {
  const { gameState, setGameState } = useContext(GameStateContext);
  return { gameState, setGameState };
};

export { GameStateProvider, GameStateContext, useGameState };
