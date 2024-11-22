import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure Navbar.js exists in components folder
import Home from "./pages/Home";          // Ensure Home.js exists in pages folder
import Faculty from "./pages/Faculty";    // Ensure Faculty.js exists in pages folder
import Achievements from "./pages/Achievements"; // Ensure Achievements.js exists in pages folder

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </Router>
  );
}

export default App;
