const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { generateGame } = require("./src/utils/game");
const path = require("path");
//use body parser
const bodyParser = require("body-parser");

//use logger
const logger = require("morgan");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(logger("dev"));

app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: "https://ef2f-2405-201-11-8958-84f7-a57-28c0-d68b.ngrok-free.app",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static(path.join(__dirname, "public")));

let gameState = null;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("startGame", (numTeams) => {
    gameState = generateGame(numTeams);
    console.log(`New game started with ${numTeams} teams`);
    io.emit("gameState", gameState);
  });

  socket.on("joinTeam", (playerName, teamName) => {
    const player = gameState.players.find(
      (player) => player.name === playerName
    );
    if (player) {
      player.teamName = teamName;
      console.log(`${playerName} joined team ${teamName}`);
      io.emit("gameState", gameState);
    } else {
      socket.emit("errorMsg", `Player ${playerName} not found`);
    }
  });

  socket.on("interceptTreasure", (playerName, targetPlayerName) => {
    const player = gameState.players.find(
      (player) => player.name === playerName
    );
    const targetPlayer = gameState.players.find(
      (player) => player.name === targetPlayerName
    );
    if (player && targetPlayer) {
      if (player.teamName === targetPlayer.teamName) {
        socket.emit("errorMsg", "Cannot intercept treasure from a teammate");
      } else if (!targetPlayer.hasTreasure) {
        socket.emit("errorMsg", "Target player does not have the treasure");
      } else {
        targetPlayer.hasTreasure = false;
        player.hasTreasure = true;
        console.log(
          `${playerName} intercepted treasure from ${targetPlayerName}`
        );
        io.emit("gameState", gameState);
      }
    } else {
      socket.emit("errorMsg", "Player not found");
    }
  });

  socket.on("deceiveTeam", (playerName, targetTeamName) => {
    const player = gameState.players.find(
      (player) => player.name === playerName
    );
    const targetTeam = gameState.teams.find(
      (team) => team.name === targetTeamName
    );
    if (player && targetTeam) {
      const deceivingPlayers = gameState.players.filter(
        (player) =>
          player.teamName === player.teamName && player.name !== playerName
      );
      deceivingPlayers.forEach((deceivingPlayer) => {
        deceivingPlayer.teamName = targetTeamName;
      });
      console.log(`${playerName} deceived team ${targetTeamName}`);
      io.emit("gameState", gameState);
    } else {
      socket.emit("errorMsg", "Player or team not found");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  if (gameState) {
    socket.emit("gameState", gameState);
  } else {
    console.log("Waiting for game state...");
  }
});

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
