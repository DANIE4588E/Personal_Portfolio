export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>(c) {year} Daniel Yong. Software Developer Portfolio.</p>
        <div className="footer-links">
          <a href="/#top">Top</a>
          <a href="/#about">About</a>
          <a href="/experience">Experience</a>
          <a href="/projects">Projects</a>
          <a href="/Daniel_Yong_Resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
