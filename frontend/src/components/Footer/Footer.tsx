import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logo">🚀 Template</div>
        <div className="links">
          <a href="#" className="link">Privacy Policy</a>
          <a href="#" className="link">Termini di Servizio</a>
          <a href="#" className="link">Contattaci</a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Template. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  )
}

export default Footer