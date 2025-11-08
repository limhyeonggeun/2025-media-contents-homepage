import React, { useState } from "react";
import "../../styles/sub/project.css";
import { members } from "../../data/product";
import ProjectModal from "./ProjectModal";

import iconMulti from "../../assets/images/icon-multi.png";
import iconVideo from "../../assets/images/icon-video.png";
import iconTeam from "../../assets/images/icon-team.png";

const loadImage = (path) => {
  try {
    return require(`../../assets/images/${path}`);
  } catch (e) {
    console.warn("이미지 로드 실패:", path);
    return null;
  }
};

export default function Project() {
  const [modalData, setModalData] = useState(null);

  const categories = [
    { img: iconMulti, label: "멀티미디어", key: "Multimedia" },
    { img: iconVideo, label: "영상미디어", key: "Video Media" },
    { img: iconTeam, label: "팀프로젝트", key: "Team Project" },
  ];

  const [activeCategory, setActiveCategory] = useState("Multimedia");

  const categoryMap = {
    Multimedia: ["Product Manager", "Developer", "Designer", "Marketer"],
    "Video Media": ["Video Producer", "3D Modeler", "Motion Graphic Designer"],
    "Team Project": ["U300", "M-Team"],
  };

  const normalize = (str) => str?.trim().toLowerCase();

  const subCategories = categoryMap[activeCategory] || [];

  const groupedMembers = subCategories.map((sub) => ({
    title: sub,
    list: members.filter(
      (m) => normalize(m.category) === normalize(sub)
    ),
  }));

  const ProfileCard = ({ data }) => {
    const productImg = loadImage(data.images.product);
  
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    const [flipped, setFlipped] = useState(false);
    const [timer, setTimer] = useState(null);
  
    const handleClick = () => {
      if (!isMobile) {
        // PC → 모달만 열림
        setModalData(data);
        return;
      }
  
      // 모바일: 뒤집힌 상태에서 다시 클릭 → 모달 열기
      if (flipped) {
        setFlipped(false);
        setModalData(data);
        return;
      }
  
      setFlipped(true);
  
      if (timer) clearTimeout(timer);

      const newTimer = setTimeout(() => {
        setFlipped(false);
      }, 1000);
  
      setTimer(newTimer);
    };
  
    return (
      <div
        className={`project-profile ${flipped ? "flip" : ""}`}
        onClick={handleClick}
      >
        <div className="profile-front">
          <img src={productImg} alt={data.name} />
        </div>
  
        <div className="profile-back">
          <img className="back-img" src={productImg} alt={data.name} />
          <div className="back-overlay">
            <span className="profile-role">{data.role}</span>
            <span className="profile-name">{data.name}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="page-container project-container">
        <div className="page-inner project-inner">

          <div className="project-category-row">
            {categories.map((item, idx) => (
              <div
                key={idx}
                className={`project-category-item ${
                  activeCategory === item.key ? "active" : ""
                }`}
                onClick={() => setActiveCategory(item.key)}
              >
                <div className="project-icon">
                  <img src={item.img} alt={item.label} />
                </div>
                <p className="project-category-label">{item.label}</p>
              </div>
            ))}
          </div>

          {groupedMembers.map((group) =>
            group.list.length > 0 ? (
              <div key={group.title}>
                <div className="project-section-title">{group.title}</div>

                <div className="project-grid">
                  {group.list.map((member) => (
                    <ProfileCard key={member.id} data={member} />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {modalData && (
        <ProjectModal
          data={{
            ...modalData,
            isTeamProject: activeCategory === "Team Project",   
            images: {
              product: loadImage(modalData.images.product),
              profile: loadImage(modalData.images.profile),
              panel: loadImage(modalData.images.panel),
            },
          }}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
}