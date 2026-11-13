import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="wordmark">
            MAKENDLESS<span>✳</span>
          </Link>
          <p>
            Video. Websites. AI.
            <br />
            Good ideas, brought to life.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>WHAT WE DO</span>
            <Link to="/studios/create">Video editing</Link>
            <Link to="/studios/build">Websites & AI</Link>
            <Link to="/studios/grow">Marketing · Coming soon</Link>
          </div>
          <div>
            <span>GET TO KNOW US</span>
            <Link to="/work">Work & concepts</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">Questions & answers</Link>
          </div>
          <div>
            <span>YOUR NEXT STEP</span>
            <Link to="/contact">
              Start a Project <ArrowUpRight size={14} />
            </Link>
            <Link to="/project-lab">Project planner</Link>
            <Link to="/find-solution">Help me choose</Link>
          </div>
        </div>
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
