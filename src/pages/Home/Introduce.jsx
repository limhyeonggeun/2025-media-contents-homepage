import React, { useEffect, useRef } from "react";
import "../../styles/main/Introduce.css";
import introduceicon from "../../assets/images/megaphone.png";
import introduceImg1 from "../../assets/images/introduce1.jpg";
import introduceImg2 from "../../assets/images/introduce2.jpg";
import introduceImg3 from "../../assets/images/introduce3.jpg";

export default function Introduce() {
  const lastScrollY = useRef(window.scrollY);
  const scrollDir = useRef("down");
  const threshold = 5;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (Math.abs(diff) > threshold) {
        scrollDir.current = diff > 0 ? "down" : "up";
        lastScrollY.current = currentY;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    const elements = document.querySelectorAll(".introduce-block");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          if (scrollDir.current === "down" && entry.isIntersecting) {
            el.classList.add("show");
          }

          if (!entry.isIntersecting && scrollDir.current === "up") {
            el.classList.remove("show");
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="introduce">
      <div className="introduce-header">
        <img
          src={introduceicon}
          alt="megaphone"
          className="introduce-header-icon"
        />
        <h2 className="introduce-header-title">미디어콘텐츠학부는요,</h2>
        <p className="introduce-header-sub">우리 학부 및 전공을 소개합니다</p>
      </div>

      <div className="introduce-content">

        <div className="introduce-block">
          <img src={introduceImg1} alt="학부 소개 이미지" className="introduce-image" />
          <div className="introduce-text">
            <p className="introduce-label">학부 소개</p>
            <h3 className="introduce-title">
              미디어콘텐츠학부는<br />
              <span>스마트미디어콘텐츠전문가</span>를 양성합니다
            </h3>
            <p className="introduce-desc">
              멀티미디어환경에 유기적으로 대응할 수 있는 첨단실용학문으로
              실무에서 요구하는 “멀티형 인재”로 성장하기 위한
              지능형·감성형·실감형 3단계 융합미디어교육과정을 통해 양성합니다.
            </p>
          </div>
        </div>

        <div className="introduce-block reverse">
          <img src={introduceImg2} alt="멀티미디어 전공 이미지" className="introduce-image" />
          <div className="introduce-text">
            <p className="introduce-label">멀티미디어 전공</p>
            <h3 className="introduce-title">
              멀티미디어전공은<br />
              다양한 <span>디지털 콘텐츠를 기획하고 제작</span>합니다
            </h3>
            <p className="introduce-desc">
              다양한 디지털 콘텐츠를 기획하고 제작하며,<br />
              졸업을 시작으로 새로운 도전과 확장된 창의적 활동을<br />
              이어갈 멀티형 인재
            </p>
          </div>
        </div>

        <div className="introduce-block">
          <img src={introduceImg3} alt="영상미디어 전공 이미지" className="introduce-image" />
          <div className="introduce-text">
            <p className="introduce-label">영상미디어 전공</p>
            <h3 className="introduce-title">
              영상미디어전공은<br />
              <span>실감형 콘텐츠를 기획하고 구현</span>합니다
            </h3>
            <p className="introduce-desc">
              영상 제작과 연출을 비롯한 실감형 콘텐츠를 기획하고 구현하며,<br />
              졸업을 시작으로 창의적 기획과 표현을 통해 확장된 활동을<br />
              이어갈 실감형 콘텐츠 인재
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}