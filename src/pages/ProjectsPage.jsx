import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import ImageCarousel from "../components/ImageCarousel";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ProjectsPage() {
  useScrollReveal();

  return (
    <div className="projects-page">
      <NavBar />

      <main className="content-section projects-page-main">
        <div className="container">
          <div className="projects-header" data-reveal>
            <div className="section-heading">
              <p className="section-kicker">Projects</p>
              <h2>Project Portfolio</h2>
            </div>
          </div>

          <div className="project-grid">
            {PROJECTS.map((project) => {
              const images = [project.image, ...(project.gallery || [])].filter(Boolean);
              const hasImages = images.length > 0;

              return (
                <article key={project.slug} className={`glass-card project-card ${hasImages ? "" : "no-image"}`} data-reveal>
                  {hasImages ? (
                    <ImageCarousel
                      images={images}
                      altPrefix={project.title}
                      containerClassName="project-card-carousel"
                      imageClassName="project-card-image"
                    />
                  ) : null}

                  <h3>{project.title}</h3>

                  {!hasImages ? (
                    <div className="project-card-details">
                      <p>
                        <strong>Type:</strong> {project.type}
                      </p>
                      <p>
                        <strong>Focus:</strong> {project.focus}
                      </p>
                      <p>
                        <strong>Outcome:</strong> {project.outcome}
                      </p>
                      <p>
                        <strong>Details:</strong> {project.detail}
                      </p>
                    </div>
                  ) : null}

                  {hasImages ? (
                    <Link className="learn-more-btn" to={`/projects/${project.slug}`}>
                      Learn More
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
