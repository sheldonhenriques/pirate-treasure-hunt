import React from "react";
import TeamCard from "./TeamCard";

const TeamsContainer = ({ teams }) => {
  return (
    <div className="team-main-container">
      <div className="button-group">
        <button className="refresh-button">Refresh</button>
        <button className="create-team-button">Create Team</button>
      </div>
      <div className="teams-container">
        <div className="team-cards-container">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              teamName={team.name}
              players={team.players}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsContainer;
