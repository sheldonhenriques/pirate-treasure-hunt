import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import Map from "./Map";
import "mapbox-gl/dist/mapbox-gl.css";
import Compass from "./Compass";
import { GameStateContext } from "./GameStateContext";
import Treasure from "./Treasure";

const SERVER_URL =
  "https://cee6-2405-201-11-8958-84f7-a57-28c0-d68b.ngrok-free.app";

const Game = () => {
  const { gameState, setGameState } = useContext(GameStateContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const [socket, setSocket] = useState(null);

  const connectToServer = () => {
    const newSocket = io(SERVER_URL);

    newSocket.on("connect", () => {
      console.log("Connected to server!");
    });

    newSocket.on("gameState", (state) => {
      console.log("Received game state:", state);
      setGameState(state);
    });

    newSocket.on("errorMsg", (msg) => {
      console.log("Received error message:", msg);
      setErrorMsg(msg);
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    connectToServer();
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Disconnected from server.");
      }
    };
  }, []);

  const startGame = () => {
    socket.emit("startGame");
  };

  const joinTeam = (teamId) => {
    socket.emit("joinTeam", teamId);
  };

  const interceptTreasure = (teamId) => {
    socket.emit("interceptTreasure", teamId);
  };

  const deceiveTeam = (teamId) => {
    socket.emit("deceiveTeam", teamId);
  };

  return (
    <div>
      {gameState ? (
        <>
          <Map gameState={gameState} />
          console.log('gameState' ,gameState)
          <Compass gameState={gameState} />
          {/* <Treasure
            gameState={gameState}
            joinTeam={joinTeam}
            interceptTreasure={interceptTreasure}
            deceiveTeam={deceiveTeam}
          /> */}
        </>
      ) : (
        <p>Waiting for game state...</p>
      )}
      {errorMsg && <p>Error: {errorMsg}</p>}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Game;
