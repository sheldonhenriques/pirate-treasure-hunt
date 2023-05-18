import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { getCardinalDirection } from "../utils/helpers";

const Compass = ({ latitude, longitude, destination }) => {
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const angle = getAngle(
      latitude,
      longitude,
      destination.latitude,
      destination.longitude
    );
    const cardinalDirection = getCardinalDirection(angle);
    setDirection(cardinalDirection);
  }, [latitude, longitude, destination]);

  // Helper function to calculate the angle between two points on a map
  const getAngle = (lat1, lon1, lat2, lon2) => {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return bearing >= 0 ? bearing : bearing + 360;
  };

  return (
    <div className="compass">
      <FontAwesomeIcon icon={faCompass} className="compass-icon" />
      {direction && <div className="compass-direction">{direction}</div>}
    </div>
  );
};

export default Compass;
