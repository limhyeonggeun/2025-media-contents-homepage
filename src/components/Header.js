import '../styles/Header.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import menuIcon from "../assets/svg/menu.svg";

export default function Header() {
  const [active, setActive] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") setActive("HOME");
    if (path === "/project") setActive("PROJECT");
    if (path === "/department") setActive("DEPARTMENT INFO");
    if (path === "/gallery") setActive("GALLERY");
    if (path === "/guestbook") setActive("GUEST BOOK");
  }, [location.pathname]);

  const menuItems = [
    "HOME",
    "PROJECT",
    "DEPARTMENT INFO",
    "GALLERY",
    "GUEST BOOK",
  ];

  const handleClick = (item) => {
    setActive(item);
    setOpenMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (item === "HOME") navigate("/");
    if (item === "PROJECT") navigate("/project");
    if (item === "DEPARTMENT INFO") navigate("/department");
    if (item === "GALLERY") navigate("/gallery");
    if (item === "GUEST BOOK") navigate("/guestbook");
  };

  return (
    <header className="Header">
      <div className="header-inner">

        <div className="logo">
          <img src={logo} alt="졸전로고" />
        </div>

        <nav className="nav desktop-nav">
          {menuItems.map((item) => (
            <span
              key={item}
              className={`nav-item ${active === item ? "active" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </span>
          ))}
        </nav>

        <button className="mobile-menu-btn" onClick={() => setOpenMenu(!openMenu)}>
          <img src={menuIcon} alt="menu" className="menu-icon" />
        </button>

      </div>

      {openMenu && (
        <nav className="mobile-nav">
          {menuItems.map((item) => (
            <span
              key={item}
              className={`mobile-nav-item ${active === item ? "active" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}