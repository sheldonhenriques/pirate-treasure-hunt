import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="game-title">Pirate Treasure Hunt</h1>
      <div className="button-container">
        <Link to="/game-setup-1" className="button start-button">
          Start
        </Link>
        <Link to="/how-to-play" className="button how-to-play-button">
          How to Play
        </Link>
      </div>
      <div className="social-icons">
        <a href="https://twitter.com/your-twitter-handle">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/your-instagram-handle">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
