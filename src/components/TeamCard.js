import React from "react";
import "../index.css";

const TeamCard = ({ teamName, players }) => {
  return (
    <div className="team-card">
      <h3 className="team-name">{teamName}</h3>
      <div className="team-players">
        {players.map((player) => (
          <div className="team-player" key={player.id}>
            <img
              src={player.image}
              alt={`Player ${player.name}`}
              className="player-pic"
            />
            <p className="player-name">{player.name}</p>
          </div>
        ))}
      </div>
      <button className="join-button">Join Team</button>
    </div>
  );
};

export default TeamCard;
