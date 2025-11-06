import React, { useEffect, useState } from "react";
import "../../styles/sub/projectModal.css";
import iconPhone from "../../assets/images/phone.png";
import iconMail from "../../assets/images/mail.png";

export default function ProjectModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState("panel");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);

      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-left">

          <div className="modal-header">
            <h2>{data.category}</h2>
          </div>

          <div className="modal-content">

            <div className="modal-image-wrap">
              <img
                src={data.images.profile}
                alt={data.name}
                className="modal-main-img"
              />
            </div>

            <div className="modal-info">
              <p className="modal-name">{data.name}</p>
              <p className="modal-role">{data.role}</p>
              <p className="modal-position">{data.position}</p>
              <p className="modal-about">{data.about}</p>

              <div className="modal-contact">
                <p>
                    <img src={iconPhone} alt="phone" className="contact-icon" />
                    <span>{data.phone}</span>
                </p>

                <p>
                    <img src={iconMail} alt="mail" className="contact-icon" />
                    <span>{data.email}</span>
                </p>
            </div>
            </div>
          </div>
        </div>

        <div className="modal-right">
          <div className="modal-right-content">
            {activeTab === "panel" && (
              <div className="modal-panel-wrap">
                <img
                  src={data.images.panel}
                  alt="Panel"
                  className="modal-panel-img"
                />
              </div>
            )}

            {activeTab === "presentation" && (
              <div className="modal-video-wrap">
                {data.links?.presentation ? (
                  <iframe
                    src={data.links.presentation}
                    title="presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <p className="empty-text">등록된 제안 발표 영상이 없습니다.</p>
                )}
              </div>
            )}

            {activeTab === "intro" && (
              <div className="modal-video-wrap">
                {data.links?.intro ? (
                  <iframe
                    src={data.links.intro}
                    title="intro"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <p className="empty-text">등록된 1분 자기소개 영상이 없습니다.</p>
                )}
              </div>
            )}
            {!data.isTeamProject && (
              <div className="modal-tab-buttons">
                <button
                  className={activeTab === "panel" ? "active" : ""}
                  onClick={() => setActiveTab("panel")}
                >
                  프로젝트 제안
                </button>

                <button
                  className={activeTab === "presentation" ? "active" : ""}
                  onClick={() => setActiveTab("presentation")}
                >
                  제안 발표
                </button>

                <button
                  className={activeTab === "intro" ? "active" : ""}
                  onClick={() => setActiveTab("intro")}
                >
                  1분 자기소개
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}