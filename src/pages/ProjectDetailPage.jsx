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
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
