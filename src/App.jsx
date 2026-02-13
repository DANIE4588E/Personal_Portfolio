import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      let frameId = 0;
      let fadeTimer = 0;

      const tryScroll = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          target.classList.add("hash-focus");
          fadeTimer = window.setTimeout(() => {
            target.classList.remove("hash-focus");
          }, 1200);
          return;
        }

        attempts += 1;
        if (attempts < 300) {
          frameId = window.requestAnimationFrame(tryScroll);
        }
      };

      tryScroll();
      return () => {
        window.cancelAnimationFrame(frameId);
        window.clearTimeout(fadeTimer);
      };
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
