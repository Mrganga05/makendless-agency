import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home, { Studios } from "./pages/Home";
import Studio from "./pages/Studio";
import ProjectLab from "./pages/ProjectLab";
import FindSolution from "./pages/FindSolution";
import Contact from "./pages/Contact";
import {
  Work,
  About,
  FAQ,
  Privacy,
  Terms,
  ServiceDetail,
  NotFound,
} from "./pages/Supporting";
import { ProjectProvider } from "./project";
import { services } from "./data";
const titles: Record<string, string> = {
  "/": "Creative & Technology Studio",
  "/studios": "Explore Studios",
  "/studios/create": "CREATE — Video & Creative",
  "/studios/build": "BUILD — Websites & AI",
  "/studios/grow": "GROW — Coming Soon",
  "/project-lab": "Living Project Lab",
  "/find-solution": "Find My Solution",
  "/contact": "Start a Project",
  "/work": "Our Work — Concept Explorations",
  "/about": "About the Studio",
  "/faq": "Questions & Answers",
  "/privacy": "Draft Privacy Policy",
  "/terms": "Draft Terms of Service",
};
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const service = pathname.startsWith("/services/")
      ? services.find((s) => s.id === pathname.split("/").pop())
      : undefined;
    const title = `MAKENDLESS — ${service?.name || titles[pathname] || "Page Not Found"}`;
    document.title = title;
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    const description =
      service?.description ||
      "Explore MAKENDLESS: a creative and technology studio for video editing, websites and AI solutions. Digital marketing is coming soon.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
    }
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <RouteEffects />
        <Navigation />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studios" element={<Studios />} />
            <Route
              path="/studios/create"
              element={<Studio key="create" world="create" />}
            />
            <Route
              path="/studios/build"
              element={<Studio key="build" world="build" />}
            />
            <Route
              path="/studios/grow"
              element={<Studio key="grow" world="grow" />}
            />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/project-lab" element={<ProjectLab />} />
            <Route path="/find-solution" element={<FindSolution />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {["create", "build", "grow"].map((w) => (
              <Route
                key={w}
                path={`/${w}`}
                element={<Navigate to={`/studios/${w}`} replace />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ProjectProvider>
    </BrowserRouter>
  );
}
