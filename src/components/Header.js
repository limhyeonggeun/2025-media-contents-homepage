import '../styles/Header.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/svg/logo.svg";
import menuIcon from "../assets/svg/menu.svg";

export default function Header() {
  const [active, setActive] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const base = process.env.PUBLIC_URL || "";

  useEffect(() => {
    let path = location.pathname;

    if (path.startsWith(base)) {
      path = path.replace(base, "") || "/";
    }

    if (path === "/") setActive("HOME");
    else if (path === "/project") setActive("PROJECT");
    else if (path === "/department") setActive("DEPARTMENT INFO");
    else if (path === "/gallery") setActive("GALLERY");
    else if (path === "/guestbook") setActive("GUEST BOOK");

  }, [location.pathname, base]);

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

    if (item === "HOME") navigate(`${base}/`);
    if (item === "PROJECT") navigate(`${base}/project`);
    if (item === "DEPARTMENT INFO") navigate(`${base}/department`);
    if (item === "GALLERY") navigate(`${base}/gallery`);
    if (item === "GUEST BOOK") navigate(`${base}/guestbook`);
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