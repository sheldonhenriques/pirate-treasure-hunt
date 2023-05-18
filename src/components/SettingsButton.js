import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "../index.css";

const SettingsButton = () => {
  return (
    <button className="game-details-setting-button">
      <FontAwesomeIcon icon={faGear} className="settings-icon" />
    </button>
  );
};

export default SettingsButton;
