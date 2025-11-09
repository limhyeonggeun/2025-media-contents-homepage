import React, { useState, useEffect, useRef } from "react";
import titleIcon from "../../assets/images/membersicon.png";
import "../../styles/main/Member.css";

function importAll(r) {
  return r.keys().map((key) => ({
    src: r(key),
    name: key.split("/").pop(),
    num: parseInt(key.match(/(\d+)/)[0], 10),
  }));
}

const images = importAll(
  require.context("../../assets/images/members", false, /\.(png|jpe?g|webp)$/)
).sort((a, b) => a.num - b.num);

export default function Member() {
  const isMobile = window.innerWidth <= 600;

  const [index, setIndex] = useState(0);
  const total = images.length;

  const autoRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    autoRef.current = setInterval(() => {
      setIndex((v) => (v + 1) % total);
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [total, isMobile]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || isMobile) return;

    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) setIndex((v) => (v + 1) % total);
      else setIndex((v) => (v - 1 + total) % total);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [total, isMobile]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || isMobile) return;

    let startX = 0;

    const onDown = (e) => {
      startX = e.clientX;
    };

    const onMove = (e) => {
      if (!startX) return;
      const diff = e.clientX - startX;
      if (diff > 60) {
        setIndex((v) => (v - 1 + total) % total);
        startX = 0;
      } else if (diff < -60) {
        setIndex((v) => (v + 1) % total);
        startX = 0;
      }
    };

    const onUp = () => (startX = 0);

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseup", onUp);
    };
  }, [total, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const el = carouselRef.current;
    if (!el) return;

    let currentIndex = 0;

    const updateCurrentIndex = () => {
      const children = [...el.children];
      const scrollLeft = el.scrollLeft;

      let closest = 0;
      let minDist = Infinity;

      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      currentIndex = closest;
    };

    const onScroll = () => {
      clearInterval(autoRef.current);
      updateCurrentIndex();

      autoRef.current = setInterval(() => {
        const children = el.children;
        currentIndex = (currentIndex + 1) % children.length;

        el.scrollTo({
          left: children[currentIndex].offsetLeft - 20,
          behavior: "smooth",
        });
      }, 3000);
    };

    el.addEventListener("scroll", onScroll);

    const children = el.children;
    autoRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % children.length;
      el.scrollTo({
        left: children[currentIndex].offsetLeft - 20,
        behavior: "smooth",
      });
    }, 3000);

    return () => {
      clearInterval(autoRef.current);
      el.removeEventListener("scroll", onScroll);
    };
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

      <div
        className={`member-carousel ${isMobile ? "mobile" : ""}`}
        ref={carouselRef}
      >
        {images.map((img, i) => {
          if (isMobile) {
            return (
              <div key={i} className="member-card mobile">
                <img src={img.src} alt={img.name} />
              </div>
            );
          }

          const center = Math.floor(total / 2);
          const offset = (i - index + total) % total;
          const distance = offset - center;
          const abs = Math.abs(distance);

          const fixedGap = abs === 2 ? -12.5 : abs >= 3 ? -40 : 10;
          const translateX = distance * (280 + fixedGap);

          let rotateY = abs === 1 ? 25 : abs === 2 ? 45 : abs >= 3 ? 60 : 0;
          if (distance > 0) rotateY *= -1;

          const translateZ =
            abs === 1 ? -120 : abs === 2 ? 60 : abs >= 3 ? 300 : -200;

          return (
            <div
              key={i}
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
              <img src={img.src} alt={img.name} />
            </div>
          );
        })}
      </div>
    </section>
  );
}