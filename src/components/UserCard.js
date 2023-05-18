import React from "react";
import "../index.css";

const UserCard = ({ userDisplayName, userTeamName }) => {
  return (
    <button className="game-details-user-section">
      <img
        src="https://via.placeholder.com/150x15"
        alt="User Profile"
        className="game-details-user-pic"
      />
      <div className="game-details-user-info">
        <h3 className="game-details-user-name">{userDisplayName}</h3>
        <p className="game-details-user-team">{userTeamName}</p>
      </div>
    </button>
  );
};

export default UserCard;
