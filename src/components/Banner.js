import '../styles/Banner.css';
import CaretDown from '../assets/svg/CaretDown.svg';

export default function Banner() {
  return (
    <section className="Banner">
      <video
        className="banner-video"
        src="/assets/videos/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="banner-overlay">
        <div>
          <h1 className="title">RE :</h1>
          <p className="subtitle-eng">2025 SWU MEDIA CONTENTS EXHIBITION</p>
          <p className="subtitle-kr">서원대학교 미디어콘텐츠학과 졸업전시회</p>
        </div>

        <div className="banner-scroll">
          <span>SCROLL</span>
          <img src={CaretDown} alt="scroll arrow" className="arrow-icon" />
        </div>
      </div>
    </section>
  );
}