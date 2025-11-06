import '../styles/Header.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png";

export default function Header() {
  const [active, setActive] = useState('HOME');
  const navigate = useNavigate();

  const menuItems = [
    'HOME',
    'PROJECT',
    'DEPARTMENT INFO',
    'GALLERY',
    'GUEST BOOK',
  ];

  const handleClick = (item) => {
    setActive(item);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (item === 'HOME') navigate('/');
    if (item === 'PROJECT') navigate('/project');
    if (item === 'DEPARTMENT INFO') navigate('/department');
    if (item === 'GALLERY') navigate('/gallery');
    if (item === 'GUEST BOOK') navigate('/guestbook');
  };

  return (
    <header className="Header">
      <div className="header-inner">
        <div className="logo">
          <img src={logo} alt="졸전로고" />
        </div>

        <nav className="nav">
          {menuItems.map((item) => (
            <span
              key={item}
              className={`nav-item ${active === item ? 'active' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}