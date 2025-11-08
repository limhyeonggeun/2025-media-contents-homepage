import React, { useEffect } from "react";
import "../../styles/sub/facultymodal.css";
import iconPhone from "../../assets/images/phone.png";
import iconMail from "../../assets/images/mail.png";

export default function FacultyModal({ professor, onClose, loadImage }) {

  useEffect(() => {
    if (professor) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [professor]);

  if (!professor) return null;

  const imageSrc = loadImage(professor.img);

  const showPhone = professor.phone || "정보 없음";
  const showEmail = professor.email || "정보 없음";

  return (
    <div className="faculty-modal-overlay" onClick={onClose}>
      <div
        className="faculty-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="faculty-modal-left">
          <div
            className="faculty-modal-img"
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
          ></div>

          <div className="faculty-modal-info-wrap">
            <p className="faculty-modal-role">{professor.role}</p>
            <h3 className="faculty-modal-name">{professor.name}</h3>

            <div className="faculty-modal-contact">
              <p>
                <img src={iconPhone} alt="phone" className="faculty-contact-icon" />
                <span>{showPhone}</span>
              </p>
              <p>
                <img src={iconMail} alt="mail" className="faculty-contact-icon" />
                <span>{showEmail}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="faculty-modal-right">
          <div className="faculty-modal-message-box">
            <h4 className="faculty-modal-title">졸업생에게 보내는 메시지</h4>

            <div className="scroll-area">
              <p className="faculty-modal-message">{professor.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}