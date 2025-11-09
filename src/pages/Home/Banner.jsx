import '../../styles/main/Banner.css';
import { useEffect, useState } from 'react';
import CaretDown from '../../assets/svg/CaretDown.svg';
import BannerVideo from '../../assets/images/test.jpg'

export default function Banner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`Banner ${visible ? 'show' : ''}`}>
      <img src={BannerVideo} alt="scroll arrow" className='banner-video' />
      {/* <video
        className="banner-video"
        src={BannerVideo}
        autoPlay
        loop
        muted
        playsInline
      /> */}

      <div className="banner-overlay">
        <div>
          <h1 className="title">RE:</h1>
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