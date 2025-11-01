import '../styles/Poster.css';
import posterImg from '../assets/images/poster.png';

export default function Poster() {
  return (
    <section className="poster">
      <div className="poster-inner">
        <div className="poster-left">
          <img src={posterImg} alt="2025 SWU Media Contents Exhibition Poster" />
        </div>

        <div className="poster-right">
          <h1 className="poster-title">RE:</h1>
          <p className="poster-subtitle">어쩌고저쩌고설명글좋은말대충기록한말~</p>

          <div className="pster-line"></div>

          <div className="poster-desc">
            <p>대충 있ㅇ어보이는 명언 모음집 키키키 안녕하싱옹ㅇ가 메롱메롱메롱</p>
            <p>대충 있어보이는 멋언 모음집 키키키 안녕하세요ㅇㅇ가 메롱메롱</p>
            <p>대충 있어보이는 멋언 모음집 키키키 안녕하세요ㅇㅇ가 메롱메롱</p>
            <p>대충 있어보이는 멋언 모음집 키키키 안녕하세요ㅇㅇ가 메롱메롱</p>
            <p>대충 있어보이는 멋언 모음집 키키키 안녕하세요ㅇㅇ가 메롱메롱</p>                                                
            <p>2025 미디어콘텐츠학과 졸업전시회 SEWON UNIVERSITY, 2025</p>
          </div>

          <div className="poster-footer">
            <p>2025 서원대학교 미디어콘텐츠학과 졸업전시회</p>
            <p>2025 SWU MEDIA CONTENTS EXHIBITION</p>
            <p>SEWON UNIVERSITY, 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
