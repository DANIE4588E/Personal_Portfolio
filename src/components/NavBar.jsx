import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          Daniel Yong
        </Link>
        <button
          type="button"
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/#top" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/#about" onClick={closeMenu}>
            About
          </Link>
          <Link to="/experience" onClick={closeMenu}>
            Experience
          </Link>
          <Link to="/#education" onClick={closeMenu}>
            Education
          </Link>
          <Link to="/#achievements" onClick={closeMenu}>
            Achievements
          </Link>
          <Link to="/projects" onClick={closeMenu}>
            Projects
          </Link>
          <Link to="/#contact" onClick={closeMenu}>
            Contact
          </Link>
          <a className="resume-link" href="/Daniel_Yong_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
