import "./Hero.css";

function Hero() {
  // Scroll semplice verso la sezione contatti in Home
  const scrollToForm = () => {
    const formSection = document.getElementById("contact-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-banner__content">
        <h1 className="hero-banner__title">WorkSpaceNow</h1>
        <p className="hero-banner__subtitle">
          Richiedi il tuo spazio, per lavoro, studio oppure meet.
        </p>
        <button onClick={scrollToForm} className="hero-banner__cta">
          Richiedi Ora
        </button>
      </div>
    </section>
  );
}

export default Hero;
