import React, { useState, useRef, useEffect, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../index.css";

const Map = ({ gameState, circleSize }) => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: gameState.centerCoords ?? [-122.431297, 37.773972], // San Francisco coordinates
      zoom: 12,
    });
    newMap.dragRotate.disable();
    newMap.touchZoomRotate.disableRotation();

    const nav = new mapboxgl.NavigationControl();
    newMap.addControl(nav, "bottom-right");

    const geo = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
      showAccuracyCircle: false,
    });
    newMap.addControl(geo, "bottom-right");

    gameState.map = newMap;

    return () => {
      newMap.remove();
    };
  }, [gameState, mapContainerRef]);

  useEffect(() => {
    if (gameState.map) {
      const handleMapLoad = () => {
        setMapLoaded(true);
        const center = gameState.map.getCenter();
        gameState.centerCoords = center.toArray();
        gameState.map.addSource("center", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: gameState.centerCoords,
                },
              },
            ],
          },
        });

        gameState.map.addLayer({
          id: "center-layer",
          type: "circle",
          source: "center",
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [20, circleSize * 2000],
              ],
              base: 2,
            },
            "circle-color": "rgba(0, 0, 255, 0.4)",
            "circle-opacity": 0.5,

            "circle-stroke-width": 2,
            "circle-stroke-color": "white",
          },
        });
      };
      gameState.map.on("load", handleMapLoad);
    }
  }, [gameState.map, circleSize]);

  useEffect(() => {
    if (gameState.map && mapLoaded) {
      const updateSource = () => {
        const center = gameState.map.getCenter();
        gameState.centerCoords = center.toArray();
        // Update the center feature
        const centerFeature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: gameState.centerCoords,
          },
        };

        gameState.map.getSource("center").setData(centerFeature);
      };

      gameState.map.on("move", () => {
        updateSource();
      });

      gameState.map.on("mouseup", () => {
        updateSource();
      });

      gameState.map.setPaintProperty("center-layer", "circle-radius", {
        stops: [
          [0, 0],
          [20, circleSize * 2000],
        ],
        base: 2,
      });

      gameState.circleSize = circleSize;
    }
  }, [gameState, circleSize, mapLoaded]);

  return (
    <div className="map-container">
      <div ref={mapContainerRef} style={{ height: "80vh", width: "90vw" }} />
      {mapLoaded && (
        <FontAwesomeIcon icon={faMapMarkerAlt} className="center-icon" />
      )}
    </div>
  );
};

export default Map;
