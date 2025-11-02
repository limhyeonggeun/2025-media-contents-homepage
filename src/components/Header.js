import '../styles/Header.css';
import { useState } from 'react';
import logo from "../assets/images/logo.png";

export default function Header() {
  const [active, setActive] = useState('HOME');

  const menuItems = [
    'HOME',
    'PROJECT',
    'DEPARTMENT INFO',
    'GALLERY',
    'GUEST BOOK',
  ];

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
              onClick={() => setActive(item)}
            >
              {item}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}