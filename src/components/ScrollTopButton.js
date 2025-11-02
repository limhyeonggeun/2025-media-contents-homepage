import React, { useState, useEffect } from "react";
import "../styles/ScrollTopButton.css";
import upArrow from "../assets/images/arrow-up.png";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-top-btn ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
    >
      <img src={upArrow} alt="맨 위로" className="arrow-img" />
    </button>
  );
}
