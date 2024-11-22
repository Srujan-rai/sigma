import React from "react";
import AIBackground from "../components/AIBackground";
import "./Home.css";

const Home = () => (
  <div className="home">
    <AIBackground />
    <div className="home-content">
      <h1 className="home-title">Welcome to SIGMA</h1>
      <p className="home-description">
        <strong>SIGMA</strong> - Super Intelligent Generative and Machine Learning Algorithms
      </p>
    </div>
  </div>
);

export default Home;
