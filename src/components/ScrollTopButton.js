import React, { useState, useEffect } from "react";
import "../styles/ScrollTopButton.css";
import upArrow from "../assets/images/arrow-up.png";
import chatIcon from "../assets/images/chatbot.png";

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

  const goToChatbot = () => {
    window.location.href = "/chatbot"; // → 이동할 URL로 변경 가능
  };

  return (
    <>
      <button
        className={`chatbot-btn ${visible ? "show" : ""}`}
        onClick={goToChatbot}
        aria-label="챗봇 페이지로 이동"
      >
        <img src={chatIcon} alt="챗봇 아이콘" className="chatbot-img" />
      </button>

      <button
        className={`scroll-top-btn ${visible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
      >
        <img src={upArrow} alt="맨 위로" className="arrow-img" />
      </button>
    </>
  );
}
