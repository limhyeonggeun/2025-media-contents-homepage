import { useEffect, useRef } from 'react';
import { ReactComponent as Wave } from '../../assets/svg/wave.svg';
import dice1 from '../../assets/images/dice1.png';
import dice2 from '../../assets/images/dice2.png';
import hand from '../../assets/images/hand.png';
import '../../styles/main/Concept.css';

export default function Concept() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const path = svgEl.querySelector('path');
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const handleScroll = () => {
      const rect = svgEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.1;
      const end = windowHeight * 0.9;
      const progress = Math.min(1, Math.max(0, (windowHeight - rect.top - start) / (end - start)));
      path.style.strokeDashoffset = `${(1 - progress) * length}`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="concept">
      <div className="concept-line-wrap">
        <Wave ref={svgRef} className="concept-line" />
      </div>

      <div className="center-line"></div>

      <div className="concept-content">
        <h1 className="concept-title">
          <span className="fill">R</span>
          <span className="outline">E</span>
          <span className="fill">NEW</span><br />
          <span className="fill">MYS</span>
          <span className="outline">E</span>
          <span className="fill">LF</span>
        </h1>

        <div className="concept-objects">
            <img src={dice1} alt="dice1" className="dice dice1" />
            <img src={dice2} alt="dice2" className="dice dice2" />
            <img src={hand} alt="hand" className="hand" />
        </div>

        <div className="concept-desc">
          <p>가나다라마바사아자차카타파하</p><br></br>
          <p>가나다라마바사아자차카타파하하하하하하하하</p><br></br>
          <p>가나다라마바사아자차카타파하</p>
        </div>
      </div>
    </section>
  );
}
