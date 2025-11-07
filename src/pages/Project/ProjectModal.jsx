import React, { useEffect, useState } from "react";
import "../../styles/sub/projectModal.css";
import iconPhone from "../../assets/images/phone.png";
import iconMail from "../../assets/images/mail.png";

export default function ProjectModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState("panel");
  const [activeMember, setActiveMember] = useState(null);
  const isDual = data.id === "dev-03";

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

  const showProfile =
    isDual && activeMember
      ? require(`../../assets/images/${activeMember.profile}`)
      : data.images.profile;

  const showName =
    isDual && activeMember ? activeMember.name : data.name;

  const showPosition =
    isDual && activeMember ? activeMember.position : data.position;

  const showPhone =
    isDual && activeMember ? activeMember.phone : data.phone;

  const showEmail =
    isDual && activeMember ? activeMember.email : data.email;

  const showIntro =
    isDual && activeMember ? activeMember.intro : data.links?.intro;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${data.isTeamProject ? "team-style" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-left ${data.isTeamProject ? "team-left" : ""}`}>
          <div className="modal-header">
            <h2>{data.category}</h2>
          </div>

          <div className="modal-content">
            <div className="modal-image-wrap">
              <img src={showProfile} alt={showName} className="modal-main-img" />
            </div>

            <div className="modal-info">
              <p className="modal-name">{showName}</p>
              <p className="modal-role">{data.role}</p>
              <p className="modal-position">{showPosition}</p>
              <p className="modal-about">{data.about}</p>

              <div className="modal-contact">
                <p>
                  <img src={iconPhone} alt="phone" className="contact-icon" />
                  <span>{showPhone}</span>
                </p>
                <p>
                  <img src={iconMail} alt="mail" className="contact-icon" />
                  <span>{showEmail}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`modal-right ${data.isTeamProject ? "team-right" : ""}`}>
          <div className="modal-right-content">
            {activeTab === "panel" && (
              <div
                className={`modal-panel-wrap ${
                  data.isTeamProject ? "team-panel" : ""
                }`}
              >
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

            {(activeTab === "intro" || activeTab === "hyunbin" || activeTab === "giwon") && (
              <div className="modal-video-wrap">
                {showIntro ? (
                  <iframe
                    src={showIntro}
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

            {!data.isTeamProject && !isDual && (
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

            {isDual && (
              <div className="modal-tab-buttons">
                <button
                  className={activeTab === "panel" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("panel");
                    setActiveMember(null);
                  }}
                >
                  프로젝트 제안
                </button>
                <button
                  className={activeTab === "hyunbin" ? "active" : ""}
                  onClick={() => {
                    setActiveMember(data.members[0]);
                    setActiveTab("hyunbin");
                  }}
                >
                  유현빈 자기소개
                </button>
                <button
                  className={activeTab === "giwon" ? "active" : ""}
                  onClick={() => {
                    setActiveMember(data.members[1]);
                    setActiveTab("giwon");
                  }}
                >
                  이기원 자기소개
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}