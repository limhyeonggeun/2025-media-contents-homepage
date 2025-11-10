import '../../styles/main/Poster.css';
import posterImg from '../../assets/images/poster.jpg';

export default function Poster() {
  return (
    <section className="poster">
      <div className="poster-inner">
        <div className="poster-left">
          <img src={posterImg} alt="2025 SWU Media Contents Exhibition Poster" />
        </div>

        <div className="poster-right">
          <h1 className="poster-title">MAKE RE: REWRITE</h1>
          <p className="poster-subtitle">A STORY OF OUR LIFE : REWRITE </p>

          <div className="pster-line"></div>

          <div className="poster-desc">
            <p>A STORY OF OUR LIFE : REWRITE는 단순히 다시 쓴다는 행위를 넘어, 삶을 다시 바라보는 관점의 전환을 의미한다. RE는 다시(Again)와 관점(Perspective)을, WRITE는 기록하고 창조한다(Create & Record)는 뜻을 가진다. A STORY OF OUR LIFE : REWRITE는 정해진 결말이 아닌 각자의 시선으로 자신만의 이야기를 새롭게 구성하는 과정을 상징한다. 이는 과거를 부정하는 것이 아니라, 현재의 시점에서 그 의미를 재해석하고 미래를 향해 새로운 서사를 써 내려가는 시작점이 된다.
            </p>
          </div>

          <div className="poster-footer">
            <p>2025 서원대학교 미디어콘텐츠학과 졸업전시회</p>
            <p>2025 SWU MEDIA CONTENTS EXHIBITION</p>
            <p>SEOWON UNIVERSITY, 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
