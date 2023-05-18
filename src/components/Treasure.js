import React from "react";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Treasure = ({ latitude, longitude, isVisible }) => {
  return (
    <>
      {isVisible && (
        <Marker latitude={latitude} longitude={longitude}>
          <div className="treasure-marker">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="marker-icon" />
          </div>
        </Marker>
      )}
    </>
  );
};

export default Treasure;
