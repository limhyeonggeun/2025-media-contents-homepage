import React from "react";
import "../styles/Footer.css";
import logo from "../assets/svg/logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-info">
          <h2 className="footer-title">2025 서원대학교 미디어콘텐츠학부 졸업전시회</h2>

          <div className="footer-info-box">
            <div className="footer-row">
              <div className="footer-label">ADDRESS</div>
              <div className="footer-desc">
                (우) 28674 충북 청주시 서원구 무심서로 377-3 (모충동) 서원대학교 제1자연관 303호
              </div>
            </div>

            <div className="footer-row">
              <div className="footer-label">TELL</div>
              <div className="footer-desc">
                Tel. 043-299-8590 <br />
                Fax. 043-283-8590
              </div>
            </div>
          </div>
        </div>

        <div className="footer-logo">
          <img src={logo} alt="졸전로고" />
        </div>
      </div>
    </footer>
  );
}
