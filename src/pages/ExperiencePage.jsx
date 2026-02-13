import { useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { EXPERIENCES, VOLUNTEER_EXPERIENCES } from "../data/experiences";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ExperiencePage() {
  const [activeSlug, setActiveSlug] = useState(EXPERIENCES[0]?.slug || "");
  useScrollReveal();

  const activeExperience = useMemo(() => {
    return EXPERIENCES.find((item) => item.slug === activeSlug) || EXPERIENCES[0];
  }, [activeSlug]);

  if (!activeExperience) {
    return null;
  }

  return (
    <div className="experience-page">
      <NavBar />

      <main className="content-section experience-page-main">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker">Experience</p>
            <h2>Professional Experience Timeline</h2>
          </div>

          <div className="experience-layout" data-reveal>
            <article className="glass-card timeline-card experience-timeline-card" data-reveal>
              <ol className="timeline-list experience-nav-list">
                {EXPERIENCES.map((item) => (
                  <li key={item.slug} className={item.slug === activeSlug ? "active" : ""}>
                    <button type="button" className="experience-item-button" onClick={() => setActiveSlug(item.slug)}>
                      <p className="timeline-date">{item.date}</p>
                      <h3>{item.title}</h3>
                      <p className="timeline-org">{item.org}</p>
                    </button>
                  </li>
                ))}
              </ol>
            </article>

            <article className="glass-card experience-detail-card" data-reveal>
              {activeExperience.image ? (
                <img
                  className="experience-company-image"
                  src={activeExperience.image}
                  alt={`${activeExperience.org} logo`}
                  decoding="async"
                />
              ) : null}

              <div>
                <p className="timeline-date">{activeExperience.date}</p>
                <h3>{activeExperience.title}</h3>
                <p className="timeline-org">{activeExperience.org}</p>
              </div>

              <p className="experience-detail-summary">{activeExperience.summary}</p>
              <p>{activeExperience.detail}</p>

              <ul className="experience-highlights">
                {activeExperience.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <a
                className="learn-more-btn experience-company-link"
                href={activeExperience.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Company
              </a>
            </article>
          </div>

          <div className="experience-volunteer-block" data-reveal>
            <div className="section-heading">
              <p className="section-kicker">Community</p>
              <h2>Volunteer Experience</h2>
            </div>

            <article className="glass-card timeline-card timeline-single" data-reveal>
              <ol className="timeline-list">
                {VOLUNTEER_EXPERIENCES.map((entry) => (
                  <li key={`${entry.date}-${entry.org}`}>
                    <p className="timeline-date">{entry.date}</p>
                    <h3>{entry.title}</h3>
                    <p className="timeline-org">{entry.org}</p>
                    <p className="timeline-detail">{entry.detail}</p>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
