import React, { useState, useEffect, useRef } from "react";
import members from "../../data/members.js";
import titleIcon from "../../assets/images/membersicon.png";
import "../../styles/main/Member.css";

export default function Member() {
  const [index, setIndex] = useState(0);
  const total = members.length;
  const autoRef = useRef(null);
  const dragStart = useRef(null);
  const carouselRef = useRef(null);
  const activeZoneRef = useRef(false);

  const isMobile = window.innerWidth <= 600;

  useEffect(() => {
    if (isMobile) return;
    autoRef.current = setInterval(() => setIndex((v) => (v + 1) % total), 3000);
    return () => clearInterval(autoRef.current);
  }, [total, isMobile]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || isMobile) return;

    const onWheel = (e) => {
      if (!activeZoneRef.current) return;
      e.preventDefault();
      setIndex((v) =>
        e.deltaY > 0 ? (v + 1) % total : (v - 1 + total) % total
      );
    };

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      const leftBound = width * 0.2;
      const rightBound = width * 0.8;
      activeZoneRef.current = x >= leftBound && x <= rightBound;
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [total, isMobile]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || isMobile) return;

    const onDown = (e) => (dragStart.current = e.clientX);
    const onUp = (e) => {
      if (dragStart.current == null) return;
      const diff = e.clientX - dragStart.current;
      dragStart.current = null;
      if (diff > 50) setIndex((v) => (v - 1 + total) % total);
      else if (diff < -50) setIndex((v) => (v + 1) % total);
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, [total, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const el = carouselRef.current;
    if (!el) return;

    let current = 0;
    const children = el.children;

    const autoSlide = setInterval(() => {
      if (!children.length) return;

      current = (current + 1) % children.length;

      el.scrollTo({
        left: children[current].offsetLeft - 20,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [isMobile]);


  return (
    <section className="member-section">
      <div className="member-header">
        <img src={titleIcon} alt="졸업전시 아이콘" className="member-header-icon" />
        <h2 className="member-title">2025 졸업전시회 참여인원</h2>
        <p className="member-subtitle">
          {isMobile ? (
            <>
              새로운 시작의 결실을 함께 만든,<br />
              미디어콘텐츠학부의 학생들을 소개합니다
            </>
          ) : (
            "새로운 시작의 결실을 함께 만든, 미디어콘텐츠학부의 학생들을 소개합니다"
          )}
        </p>
      </div>

      <div className={`member-carousel ${isMobile ? "mobile" : ""}`} ref={carouselRef}>
        {members.map((m, i) => {
          if (isMobile) {
            return (
              <div key={m.id} className="member-card mobile">
                <img src={m.img} alt={m.name} />
              </div>
            );
          }

          const center = Math.floor(total / 2);
          const offset = (i - index + total) % total;
          const distance = offset - center;
          const abs = Math.abs(distance);

          let fixedGap = 10;
          if (abs === 2) fixedGap = -12.5;
          else if (abs >= 3) fixedGap = -40;

          const gap = 280;
          const translateX = distance * (gap + fixedGap);

          let rotateY = 0;
          if (abs === 1) rotateY = 25;
          else if (abs === 2) rotateY = 45;
          else if (abs >= 3) rotateY = 60;
          if (distance > 0) rotateY *= -1;

          const baseDepth = 200;
          let translateZ = -baseDepth;
          if (abs === 1) translateZ = -120;
          else if (abs === 2) translateZ = 60;
          else if (abs >= 3) translateZ = 300;

          return (
            <div
              key={m.id}
              className="member-card"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${translateX}px)
                  translateZ(${translateZ}px)
                  rotateY(${rotateY}deg)
                `,
                zIndex: 100 - abs,
              }}
            >
              <img src={m.img} alt={m.name} />
            </div>
          );
        })}
      </div>
    </section>
  );
}