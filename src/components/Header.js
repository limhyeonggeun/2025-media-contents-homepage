import '../styles/Header.css';
import { useState } from 'react';

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
        <div className="logo">LOGO</div>

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