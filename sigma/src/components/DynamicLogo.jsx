import React, { useState, useEffect } from "react";
import "./DynamicLogo.css";

const DynamicLogo = () => {
  const abbreviation = "S I G M A";
  const fullAbbreviation =
    "Sahyadri Intellectual Gallants Mascots of Artificial Intelligence";

  const [displayText, setDisplayText] = useState(""); // Current displayed text
  const [isTypingFullText, setIsTypingFullText] = useState(false); // Toggle between abbreviation and fullAbbreviation
  const [charIndex, setCharIndex] = useState(0); // Current character index

  useEffect(() => {
    const currentText = isTypingFullText ? fullAbbreviation : abbreviation;

    // Typing logic: Add characters one by one
    if (charIndex <= currentText.length) {
      const typingInterval = setInterval(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex((prevIndex) => prevIndex + 1);
      }, 50); // Faster typing speed

      return () => clearInterval(typingInterval);
    }

    // Delay before switching modes
    if (charIndex > currentText.length) {
      const delayTimeout = setTimeout(() => {
        setCharIndex(0);
        setIsTypingFullText((prev) => !prev); // Switch to the other text
      }, 1000); // Delay before switching

      return () => clearTimeout(delayTimeout);
    }
  }, [charIndex, isTypingFullText, abbreviation, fullAbbreviation]);

  // Highlight first letters dynamically
  const highlightedText = displayText.split("").map((char, index) => {
    if (("SIGMA".includes(char) && fullAbbreviation.indexOf(char) === index) || (("SIGMA".includes(char) && abbreviation.indexOf(char) === index))) {
      return (
        <span key={index} className="highlight">
          {char}
        </span>
      );
    }
    return <span key={index}>{char}</span>;
  });

  return (
    <div className="dynamic-logo-container">
      <div className="logo"></div>
      <h1 className="main-text">{highlightedText}</h1>
    </div>
  );
};

export default DynamicLogo;
