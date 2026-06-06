import './Hero.css'

function Hero() {
  // Scroll semplice verso la sezione contatti in Home
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="hero">
      <div className="content">
        <h1 className="title">Crea il tuo prossimo progetto con successo</h1>
        <p className="subtitle">
          Un template moderno, reattivo e pronto per la produzione. Connettiamo frontend e backend senza stress.
        </p>
        <button onClick={scrollToForm} className="ctaButton">
          Inizia Ora
        </button>
      </div>
    </section>
  )
}

export default Hero