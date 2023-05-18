import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import {
  GameStateProvider,
  GameStateContext,
} from "./components/GameStateContext";
import GameSetupStep1 from "./components/GameSetupStep1";
import GameSetupStep2 from "./components/GameSetupStep2";
import GameSetupStep3 from "./components/GameSetupStep3";
import GameDetails from "./components/GameDetails";

function App() {
  const [gameState, setGameState] = useState({});
  useEffect(() => {
    const storedGameState = localStorage.getItem("gameState");
    if (storedGameState) {
      setGameState(JSON.parse(storedGameState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);
  // return (
  //   <GameStateProvider>
  //     <Router>
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={
  //             // <GameStateContext.Provider value={{ gameState, setGameState }}>
  //             <Home />
  //             // </GameStateContext.Provider>
  //           }
  //         />
  //         <Route
  //           path="/game-setup-1"
  //           element={
  //             // <GameStateContext.Provider value={{ gameState, setGameState }}>
  //             <GameSetupStep1 />
  //             // </GameStateContext.Provider>
  //           }
  //         />
  //         <Route
  //           path="/game-setup-2"
  //           element={
  //             // <GameStateContext.Provider value={{ gameState, setGameState }}>
  //             <GameSetupStep2 />
  //             // </GameStateContext.Provider>
  //           }
  //         />

  //         {/* <Route component={NotFoundPage} /> */}
  //       </Routes>
  //     </Router>
  //   </GameStateProvider>
  // );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GameStateContext.Provider value={{ gameState, setGameState }}>
              <Home />
            </GameStateContext.Provider>
          }
        />
        <Route path="/game" element={<Game />} />
        <Route
          path="/game-setup-1"
          element={
            <GameStateContext.Provider value={{ gameState, setGameState }}>
              <GameSetupStep1 />
            </GameStateContext.Provider>
          }
        />
        <Route
          path="/game-setup-2"
          element={
            <GameStateContext.Provider value={{ gameState, setGameState }}>
              <GameSetupStep2 />
            </GameStateContext.Provider>
          }
        />
        <Route
          path="/game-setup-3"
          element={
            <GameStateContext.Provider value={{ gameState, setGameState }}>
              <GameSetupStep3 />
            </GameStateContext.Provider>
          }
        />
        <Route
          path="/game-details/:id"
          element={
            <GameStateContext.Provider value={{ gameState, setGameState }}>
              <GameDetails />
            </GameStateContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
