import "./Footer.css";

import instagramLogo from "/instagram.png";
import linkedInLogo from "/linkedin.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">WorkSpaceNow</div>
        <div className="site-footer__links">
          <a href="#" className="site-footer__link">
            Privacy Policy
          </a>
          <a href="#" className="site-footer__link">
            Termini di Servizio
          </a>
          <a href="#" className="site-footer__link">
            Contattaci
          </a>
        </div>
        <div className="site-footer__socials">
          <p>Contattaci anche sui nostri social:</p>
          <div className="site-footer__link-social">
            <a href="#" className="site-footer__social">
              <img src={instagramLogo} alt="Instagram Logo" />
            </a>
            <a href="#" className="site-footer__social">
              <img src={linkedInLogo} alt="LinkedIn Logo" />
            </a>
          </div>
        </div>
        <div className="site-footer__copyright">
          © {new Date().getFullYear()} WorkSpaceNow. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
