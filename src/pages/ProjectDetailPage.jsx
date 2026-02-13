import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import ImageCarousel from "../components/ImageCarousel";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useScrollReveal from "../hooks/useScrollReveal";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  useScrollReveal();

  if (!project) {
    return (
      <div className="project-detail-page">
        <NavBar />

        <main className="content-section project-detail-main">
          <div className="container">
            <article className="glass-card">
              <h2>Project Not Found</h2>
              <p>The project link is invalid or no longer available.</p>
              <Link className="learn-more-btn" to="/projects">
                Back to Projects
              </Link>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const projectImages = [project.image, ...(project.gallery || [])].filter(Boolean);

  return (
    <div className="project-detail-page">
      <NavBar />

      <main className="content-section project-detail-main">
        <div className="container">
          <div className="project-detail-top" data-reveal>
            <Link className="detail-back" to="/projects">
              {"< Back to Projects"}
            </Link>
          </div>

          <article className="glass-card project-detail-card" data-reveal>
            <h1>{project.title}</h1>

            {projectImages.length > 0 ? (
              <ImageCarousel
                images={projectImages}
                altPrefix={project.title}
                containerClassName="project-detail-carousel"
                imageClassName="project-detail-image"
              />
            ) : null}

            <div className="project-detail-grid">
              <div>
                <h3>Type</h3>
                <p>{project.type}</p>
              </div>
              <div>
                <h3>Focus</h3>
                <p>{project.focus}</p>
              </div>
              <div>
                <h3>Outcome</h3>
                <p>{project.outcome}</p>
              </div>
            </div>

            <div className="project-detail-body">
              <h3>Details</h3>
              <p>{project.detail}</p>
            </div>

            {Array.isArray(project.stack) && project.stack.length > 0 ? (
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="project-link-row">
              <div className="project-link-icons">
                {project.website ? (
                  <a
                    className="project-icon-link"
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} website`}
                    title="Visit Website"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h7v2H7v10h10v-5h2v7H5V5z"
                      />
                    </svg>
                  </a>
                ) : null}

                {project.github ? (
                  <a
                    className="project-icon-link"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    title="Visit GitHub"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.1c-3.2.69-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.71 1.25 3.37.95.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.67 0-1.25.44-2.27 1.17-3.06-.12-.29-.5-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.24 2.75.12 3.04.73.79 1.17 1.81 1.17 3.06 0 4.4-2.68 5.37-5.24 5.66.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
                      />
                    </svg>
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
