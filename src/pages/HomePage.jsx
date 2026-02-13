import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import ModelViewer from "../components/ModelViewer";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { EXPERIENCES, VOLUNTEER_EXPERIENCES } from "../data/experiences";
import useScrollReveal from "../hooks/useScrollReveal";

const skillGroups = [
  {
    title: "Core Development",
    items: ["Python", "Flask", "JavaScript", "C#", "C++", "SQL", "HTML/CSS"],
  },
  {
    title: "Tools & Platforms",
    items: ["Unity", "Godot", "UE5", "Scratch", "Micro:bit", "EV3 / SPIKE Prime"],
  },
  {
    title: "Professional Strengths",
    items: ["Debugging", "Git / PR Workflow", "Data Analysis", "Computer Networking", "Technical Communication"],
  },
];

const educationTimeline = [
  {
    date: "2025 - 2028",
    title: "Diploma in Applied Artificial Intelligence & Analytics",
    org: "Nanyang Polytechnic",
    grade: "GPA: 4.0",
    detail: "Focused on software systems, analytics workflows, and practical implementation projects.",
  },
  {
    date: "2021 - 2024",
    title: "GCE O-Level Certificate",
    org: "Nan Hua High School",
    grade: "L1R5: Raw 12, Net 10",
    detail: "Completed secondary education with strong technical interest in coding and problem solving.",
  },
];

const awardsTimeline = [
  {
    date: "2026",
    title: "AWS GenAI Tournament Winner",
    org: "Competition",
    outcome: "Winner",
    detail: "Achieved top placement in a GenAI-focused competition environment.",
  },
  {
    date: "2025",
    title: "Huawei Tech4City",
    org: "Competition",
    outcome: "Participant",
    detail: "Participated in a national-level technology challenge context.",
  },
  {
    date: "2025",
    title: "IDE Robotics",
    org: "Competition",
    outcome: "Participant",
    detail: "Participated in robotics problem-solving and implementation challenges.",
  },
  {
    date: "2025",
    title: "HacX Challenge",
    org: "Competition",
    outcome: "Participant",
    detail: "Contributed in hackathon-style technical challenge activities.",
  },
  {
    date: "2022",
    title: "WRO Secondary",
    org: "Competition",
    outcome: "Participant",
    detail: "Early-stage robotics competition experience.",
  },
];

const certificationsTimeline = [
  {
    date: "2025",
    title: "AI Fluency Framework & Foundations",
    org: "Anthropic",
    detail: "Completed certification focused on applied AI fundamentals.",
  },
  {
    date: "2025",
    title: "Certified Entry-Level Python Programmer",
    org: "Python Institute",
    detail: "Validated foundational Python development competency.",
  },
  {
    date: "Undated",
    title: "Robotics Certificate Program Using SPIKE Prime (Advanced)",
    org: "Nullspace Robotics",
    detail: "Completed advanced robotics coursework using SPIKE Prime.",
  },
];

const interests = ["Coding", "Web Development", "App Development", "Cloud", "Game Development", "Robotics", "3D Graphics / Design"];

function TimelineList({ items }) {
  return (
    <ol className="timeline-list">
      {items.map((entry) => (
        <li key={`${entry.date}-${entry.title}`}>
          <p className="timeline-date">{entry.date}</p>
          <h3>{entry.title}</h3>
          <p className="timeline-org">{entry.org}</p>
          {entry.grade ? <p className="timeline-grade">{entry.grade}</p> : null}
          {entry.outcome ? <p className="timeline-outcome">{entry.outcome}</p> : null}
          <p className="timeline-detail">{entry.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function ExperiencePreviewList({ items }) {
  return (
    <ol className="timeline-list experience-preview-list">
      {items.map((entry) => (
        <li key={`${entry.date}-${entry.title}`}>
          <p className="timeline-date">{entry.date}</p>
          <h3>{entry.title}</h3>
          <p className="timeline-org">{entry.org}</p>
        </li>
      ))}
    </ol>
  );
}

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);
  useScrollReveal();

  return (
    <>
      <NavBar />

      <main>
        <section id="top" className="hero-stage">
          <ModelViewer onIntroComplete={handleIntroComplete} />

          <div className={`hero-name ${introComplete ? "visible" : ""}`}>
            <p className="hero-role">Software Developer</p>
            <h1>Daniel Yong</h1>
          </div>

          <p className={`hero-caption ${introComplete ? "visible" : ""}`}>
            Entry-level software developer focused on full-stack delivery, Python automation, and 3D-driven design.
          </p>
        </section>

        <section id="about" className="content-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">About Me</p>
              <h2>Profile</h2>
            </div>

            <div className="about-grid">
              <article className="glass-card" data-reveal>
                <h3>Hey, I'm <span className="name">Daniel!</span></h3>
                <p>
                  An entry-level software developer with hands-on experience across full-stack web development,
                  Python automation, and technical teaching environments. Through internships and instructional roles,
                  I have built a practical workflow for delivering features, debugging issues systematically, and
                  communicating technical ideas clearly to different audiences. I am especially interested in building
                  reliable software that balances strong implementation with good user experience, and I continue to
                  grow my skills in modern development tools, robotics-related systems, and 3D-focused design.
                </p>
              </article>

              <article className="glass-card" data-reveal>
                <h3>Skills</h3>
                <div className="skill-groups">
                  {skillGroups.map((group) => (
                    <div key={group.title}>
                      <p className="group-title">{group.title}</p>
                      <div className="chip-row">
                        {group.items.map((item) => (
                          <span key={item} className="chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="experience-cta">
                  <Link className="learn-more-btn" to="/projects">
                    View Projects
                  </Link>
                </div>
              </article>

              <article className="glass-card about-full" data-reveal>
                <h3>Interests</h3>
                <div className="chip-row">
                  {interests.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="experience" className="content-section timeline-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Experience</p>
              <h2>Professional Experience</h2>
            </div>

            <article className="glass-card timeline-card timeline-single" data-reveal>
              <ExperiencePreviewList items={EXPERIENCES} />
              <div className="experience-cta">
                <Link className="learn-more-btn" to="/experience">
                  Learn More
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Projects</p>
              <h2>Project Highlights</h2>
            </div>

            <div className="home-projects-grid">
              <Link className="glass-card home-project-tile" to="/projects/careswap-full-stack-platform" data-reveal>
                <img className="home-project-image" src="/images/Careswap.png" alt="Care-Swap project preview" />
                <div className="home-project-overlay" />
                <h3>Care-Swap</h3>
                <p>View project details</p>
              </Link>

              <Link className="glass-card home-project-tile" to="/projects/lost-moonlit" data-reveal>
                <img className="home-project-image" src="/images/Moonlit.png" alt="Moonlit project preview" />
                <div className="home-project-overlay" />
                <h3>Moonlit</h3>
                <p>View project details</p>
              </Link>

              <Link className="glass-card home-project-tile" to="/projects/nyp-badminton-cca-website" data-reveal>
                <img className="home-project-image" src="/images/Badminton.png" alt="NYP Badminton CCA website preview" />
                <div className="home-project-overlay" />
                <h3>NYP Badminton CCA Website</h3>
                <p>View project details</p>
              </Link>

              <Link className="glass-card home-project-tile home-project-tile-all" to="/projects" data-reveal>
                <h3>
                  View all projects <span className="tile-arrow" aria-hidden="true">&rarr;</span>
                </h3>
                <p>Browse complete project list</p>
              </Link>
            </div>
          </div>
        </section>

        <section id="education" className="content-section timeline-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Education</p>
              <h2>Academic Background</h2>
            </div>

            <article className="glass-card timeline-card timeline-single" data-reveal>
              <TimelineList items={educationTimeline} />
            </article>
          </div>
        </section>

        <section id="achievements" className="content-section timeline-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Achievements</p>
              <h2>Awards and Certifications</h2>
            </div>

            <div className="achievements-grid">
              <article className="glass-card timeline-card" data-reveal>
                <h3 className="timeline-group-title">Awards</h3>
                <TimelineList items={awardsTimeline} />
              </article>

              <article className="glass-card timeline-card" data-reveal>
                <h3 className="timeline-group-title">Certifications</h3>
                <TimelineList items={certificationsTimeline} />
              </article>
            </div>
          </div>
        </section>

        <section id="community" className="content-section timeline-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Community</p>
              <h2>Volunteer Experience</h2>
            </div>

            <article className="glass-card timeline-card timeline-single" data-reveal>
              <TimelineList items={VOLUNTEER_EXPERIENCES} />
            </article>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="container">
            <div className="section-heading">
              <h2 style={{ color: "var(--primary)" }}>Contact Me</h2>
            </div>

            <div className="contact-grid" data-reveal>
              <a href="mailto:danielyongzx@gmail.com">danielyongzx@gmail.com</a>
              <a href="tel:+6582923677">+65 8292 3677</a>
              <a href="https://www.linkedin.com/in/daniel-yong-88a874265/" target="_blank" rel="noopener noreferrer">
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
                  />
                </svg>
                LinkedIn
              </a>
              <a href="https://github.com/DANIE4588E" target="_blank" rel="noopener noreferrer">
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.1c-3.2.69-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.71 1.25 3.37.95.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.67 0-1.25.44-2.27 1.17-3.06-.12-.29-.5-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.24 2.75.12 3.04.73.79 1.17 1.81 1.17 3.06 0 4.4-2.68 5.37-5.24 5.66.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
                  />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
