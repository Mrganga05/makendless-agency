import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link to="/" className="wordmark">
            MAKENDLESS
          </Link>
          <p>
            A creative mind. A technical soul.
            <br />
            Endless possibilities.
          </p>
          <span className="eyebrow">CREATE · BUILD · GROW</span>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <Link to="/studios/create">Create</Link>
            <Link to="/studios/build">Build</Link>
            <Link to="/studios/grow">
              Grow <small>Coming soon</small>
            </Link>
          </div>
          <div>
            <span>MAKE SOMETHING</span>
            <Link to="/project-lab">Project Lab</Link>
            <Link to="/find-solution">Find My Solution</Link>
            <Link to="/contact">
              Start a Project <ArrowUpRight size={13} />
            </Link>
          </div>
          <div>
            <span>THE STUDIO</span>
            <Link to="/work">Our Work</Link>
            <Link to="/about">About us</Link>
            <Link to="/faq">Questions & answers</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MAKENDLESS</span>
        <span>Made with intention. Built for possibility.</span>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
