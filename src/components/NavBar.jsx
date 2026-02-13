import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link className="brand" to="/">
          Daniel Yong
        </Link>
        <nav className="nav">
          <Link to="/#top">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/#education">Education</Link>
          <Link to="/#achievements">Achievements</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/#contact">Contact</Link>
          <a className="resume-link" href="/Daniel_Yong_Resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
