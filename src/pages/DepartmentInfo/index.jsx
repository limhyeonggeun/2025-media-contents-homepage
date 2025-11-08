import React, { useRef, useState, useEffect } from "react";
import "../../styles/sub/departmentinfo.css";
import CaretLeft from '../../assets/svg/CaretLeft.svg';
import CaretRight from '../../assets/svg/CaretRight.svg';
import facultyData from "../../data/faculty.js";

export default function DepartmentInfo() {
  const sliderRef = useRef(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  const loadImage = (path) => {
    try {
      return require(`../../assets/images/${path}`);
    } catch (e) {
      console.warn("이미지 로드 실패:", path);
      return null;
    }
  };

  const visibleCount = 4;

  const handleSlide = (dir) => {
    if (dir === "left" && sliderIndex > 0) {
      setSliderIndex((prev) => prev - 1);
    }
    if (dir === "right" && sliderIndex < facultyData.length - visibleCount) {
      setSliderIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].offsetWidth + 27;
      sliderRef.current.style.transform = `translateX(${-sliderIndex * cardWidth}px)`;
    }
  }, [sliderIndex]);

  return (
    <section className="dept-info">
      <div className="dept-header">
        <h2 className="dept-title">미디어콘텐츠학부</h2>
        <p className="dept-sub">
          미래산업의 핵심·인재·창의 융함형 멀티미디어 콘텐츠 전문가를 양성하는 미디어콘텐츠학부를 소개합니다.
        </p>
        <h2 className="dept-title">미디어콘텐츠학부 교육목표</h2>
        <p className="dept-sub">
          멀티미디어환경에 유기적으로 대응할 수 있는 첨단실용학문으로 실무에서 요구하는 "멀티형 인재"로 성장하기 위한
          <br />지능형 · 감성형 · 실감형 3단계 융합미디어교육과정을 통해 스마트미디어콘텐츠전문가를 양성합니다.
        </p>
      </div>

      <div className="dept-core">
        <div className="core-wrap">
          <div className="core-circle">
            <p className="kr">지능형 콘텐츠</p>
            <p className="en">Intelligent Contents</p>
          </div>

          <div className="core-row">
            <div className="core-center">
              <p className="center-title">브랜딩 마케팅</p>
            </div>
            <div className="core-center">
              <p className="center-title">공통영역</p>
            </div>
            <div className="core-center">
              <p className="center-title">기획설계</p>
            </div>
          </div>

          <div className="core-circle">
            <p className="kr">감성형 콘텐츠</p>
            <p className="en">Emotional Contents</p>
          </div>

          <div className="core-row">
            <div className="core-center">
              <p className="center-title">브랜딩 마케팅</p>
            </div>
            <div className="core-center">
              <p className="center-title">공통영역</p>
            </div>
            <div className="core-center">
              <p className="center-title">기획설계</p>
            </div>
          </div>

          <div className="core-circle">
            <p className="kr">실감형 콘텐츠</p>
            <p className="en">Immersive Contents</p>
          </div>
        </div>
      </div>

      <section className="dept-box">
        <h3 className="box-title">
          <span className="highlight">실무 중심</span> 콘텐츠 전문가 교육과정
        </h3>
        <p className="box-text">직무 전공별 특화 실무 교육 진행</p>
        <p className="box-text">국가직무능력표준기반 교육 커리큘럼 운영</p>
        <p className="box-text">스마트콘텐츠, 영상미디어, 게임 등 진로디자인로드맵 운영</p>
        <p className="box-text">실무 중심 교수진 및 교과 · 비교과 프로그램 구성</p>
      </section>

      <section className="dept-box">
        <h3 className="box-title">
          <span className="highlight">산하협력 프로젝트</span> 활성화
        </h3>
        <p className="box-text">첨단융합스튜디오 운영 및 활성화</p>
        <p className="box-text">실무 프로젝트 형 취·창업 동아리와 산하협력 연계</p>
        <p className="box-text">창업캡스톤디자인 과목 연계를 통합 산학연 프로젝트 진행</p>
        <p className="box-text">공모전, 경진대회 등 현업 실무자 지도 및 컨설팅 진행</p>
      </section>

      <section className="dept-box">
        <h3 className="box-title">
          멀티미디어 <span className="highlight">융복합콘텐츠 연구 개발</span>
        </h3>
        <p className="box-text">스마트디바이스 기반 스마트콘텐츠 제작</p>
        <p className="box-text">영상미디어콘텐츠 제작</p>
        <p className="box-text">VR · AR · 3D · 게임 개발</p>
        <p className="box-text">Co-working Space 기반 콘텐츠 아이디어 개발</p>
      </section>

      <section className="faculty">
        <h2 className="faculty-title">FACULTY ADVISORS</h2>
        <p className="faculty-sub">미디어콘텐츠학부 교수진을 소개합니다.</p>

        <div className="faculty-wrapper">
          <button
            className={`faculty-btn left ${sliderIndex === 0 ? "hidden" : ""}`}
            onClick={() => handleSlide("left")}
          >
            <img src={CaretLeft} alt="prev" />
          </button>

          <div className="faculty-slider" ref={sliderRef}>
            {facultyData.map((prof) => {
              const imageSrc = loadImage(prof.img);
              return (
                <div className="faculty-card" key={prof.id}>
                  <div
                    className="faculty-img"
                    style={{
                      backgroundImage: imageSrc ? `url(${imageSrc})` : "#333",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  <h3 className="faculty-role">{prof.role}</h3>
                  <h4 className="faculty-name">{prof.name}</h4>
                  <div className="faculty-bar"></div>
                  <p className="faculty-message">{prof.message}</p>
                </div>
              );
            })}
          </div>

          <button
            className={`faculty-btn right ${
              sliderIndex >= facultyData.length - visibleCount ? "hidden" : ""
            }`}
            onClick={() => handleSlide("right")}
          >
            <img src={CaretRight} alt="next" />
          </button>
        </div>
      </section>
    </section>
  );
}
