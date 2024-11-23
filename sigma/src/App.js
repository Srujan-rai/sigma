import React from "react";
import Navbar from "./components/Navbar";
import BackgroundAnimation from "./components/BackgroundAnimation";
import DynamicLogo from "./components/DynamicLogo"; 
import './App.css';
const App = () => {
  return (
    <>
      <Navbar />
      <BackgroundAnimation />
      <DynamicLogo /> {/*  */}
    </>
  );
};

export default App;
