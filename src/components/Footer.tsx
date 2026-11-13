import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../footer.css";
export default function Footer() {
  return (
    <footer className="site-footer universe-footer">
      <div className="footer-thread" aria-hidden="true" data-motion="prism">
        <span>FROM AN IDEA</span>
        <i />
        <span>TO WHAT COMES NEXT</span>
      </div>
      <div className="footer-top">
        <div className="footer-identity">
          <Link to="/" className="wordmark">
            MAKENDLESS<span>✳</span>
          </Link>
          <p>
            Video. Websites. AI.
            <br />
            Good ideas, brought to life.
          </p>
          <Link className="footer-project-link" to="/contact">
            Let’s make something <ArrowUpRight size={18} />
          </Link>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <div>
            <span>THE STUDIOS</span>
            <Link to="/studios/create">CREATE / Video editing</Link>
            <Link to="/studios/build">BUILD / Websites & AI</Link>
            <Link to="/studios/grow">GROW / Beta · Coming soon</Link>
          </div>
          <div>
            <span>GET TO KNOW US</span>
            <Link to="/work">Work & concepts</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <span>YOUR NEXT STEP</span>
            <Link to="/contact">
              Start a Project <ArrowUpRight size={14} />
            </Link>
            <Link to="/project-lab">Project Lab</Link>
            <Link to="/find-solution">Help me choose</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MAKENDLESS</span>
        <span>CREATE · BUILD · GROW</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
