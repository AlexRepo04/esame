import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">🚀 Template</div>
        <div className="site-footer__links">
          <a href="#" className="site-footer__link">Privacy Policy</a>
          <a href="#" className="site-footer__link">Termini di Servizio</a>
          <a href="#" className="site-footer__link">Contattaci</a>
        </div>
        <div className="site-footer__copyright">
          © {new Date().getFullYear()} Template. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}

export default Footer