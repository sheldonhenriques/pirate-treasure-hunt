import React, { useContext } from "react";
import { GameStateContext } from "./GameStateContext";
import TeamsContainer from "./TeamsContainer";
import UserCard from "./UserCard";
import InviteCard from "./InviteCard";
import GameInfoCard from "./GameInfoCard";
import SettingsButton from "./SettingsButton";
import { useParams } from "react-router-dom";

// dummy data for teams
const dummyTeam = [
  {
    id: 1,
    name: "Team 1",
    players: [
      {
        id: 1,
        name: "Player 1",
        image: "",
      },
      {
        id: 2,
        name: "Player 2",
        image: "",
      },
      {
        id: 3,
        name: "Player 3",
        image: "",
      },
      {
        id: 4,
        name: "Player 4",
        image: "",
      },
    ],
  },
  {
    id: 2,
    name: "Team 2",
    players: [
      {
        id: 1,
        name: "Player 1",
        image: "",
      },
      {
        id: 2,
        name: "Player 2",
        image: "",
      },
      {
        id: 3,
        name: "Player 3",
        image: "",
      },
      {
        id: 4,
        name: "Player 4",
        image: "",
      },
    ],
  },
];

const GameDetails = () => {
  const { gameState } = useContext(GameStateContext);
  const { id } = useParams();
  const gameId = gameState.gameId;
  const userDisplayName = "John Doe"; // Replace with current user's display name
  const userTeamName = "Team A"; // Replace with current user's team name
  console.log(gameState);
  return (
    <div className="game-details-container">
      <div className="game-details-header">
        <h1 className="game-details-title">{`Game name - ${gameId}`}</h1>
        <SettingsButton />
      </div>
      <GameInfoCard gameState={gameState}></GameInfoCard>
      <InviteCard></InviteCard>
      <UserCard
        userDisplayName={userDisplayName}
        userTeamName={userTeamName}
      ></UserCard>
      <TeamsContainer teams={dummyTeam}></TeamsContainer>
    </div>
  );
};

export default GameDetails;
