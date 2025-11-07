import React, { useState, useEffect } from "react";
import "../styles/ScrollTopButton.css";
import { ReactComponent as ArrowUp } from "../assets/svg/arrow-up.svg";
import chatIcon from "../assets/images/chatbot.png";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggleChat = () => setShowChat((prev) => !prev);

  return (
    <>
      <button
        className={`chatbot-btn ${visible ? "move-up" : ""}`}
        onClick={toggleChat}
        aria-label="챗봇 열기"
      >
        <img src={chatIcon} alt="챗봇 아이콘" className="chatbot-img" />
      </button>

      {showChat && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span>2025미디어콘텐츠학부 졸업전시회 안내 챗봇 RE:ON</span>
            <button onClick={() => setShowChat(false)}>✕</button>
          </div>
          <iframe
            src="https://re2025.duckdns.org"
            title="졸전 챗봇"
            className="chatbot-frame"
          ></iframe>
        </div>
      )}

      <button
        className={`scroll-top-btn ${visible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="arrow-img" />
      </button>
    </>
  );
}