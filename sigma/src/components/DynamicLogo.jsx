import React, { useState, useEffect } from "react";
import "./DynamicLogo.css";

const DynamicLogo = () => {
  const abbreviation = "SIGMA";
  const fullAbbreviation =
    "Sahyadri Intellectual Gallants Mascots of Artificial Intelligence";

  const [displayText, setDisplayText] = useState(abbreviation); 
  const [textIndex, setTextIndex] = useState(0); 
  const [isErasing, setIsErasing] = useState(false); 
  const [isTypingFullText, setIsTypingFullText] = useState(false); 

  const typeFullText = () => {
    if (textIndex < fullAbbreviation.length) {
      setDisplayText((prev) => prev + fullAbbreviation[textIndex]);
      setTextIndex((prev) => prev + 1);
    } else {
      setTimeout(() => {
        setIsErasing(true);
      }, 1000);
    }
  };

  const eraseText = () => {
    if (textIndex > 0) {
      setDisplayText((prev) => prev.slice(0, -1)); 
      setTextIndex((prev) => prev - 1);
    } else {
      setIsErasing(false);
      setTextIndex(0);
      setDisplayText("");
      setIsTypingFullText(true); 
    }
  };

 
  useEffect(() => {
    let interval;

    if (isErasing) {
      
      interval = setInterval(eraseText, 100); 
    } else if (isTypingFullText) {
      interval = setInterval(typeFullText, 100); 
    }

    return () => clearInterval(interval);
  }, [isErasing, textIndex, isTypingFullText]);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      if (!isErasing && !isTypingFullText) {
        setDisplayText(""); 
        setTextIndex(0); 
        setIsErasing(true); 
      } else if (isErasing && textIndex === 0) {
        setIsErasing(false);
        setIsTypingFullText(true);
      }
    }, 3000);

    return () => clearInterval(cycleInterval);
  }, [isErasing, isTypingFullText, textIndex]);

  return (
    <div className="dynamic-logo-container">
      <div className="logo"></div>
      <h1 className="main-text">{displayText}</h1>
    </div>
  );
};

export default DynamicLogo;
