import "./About.css";

import laptopWork from "/laptop.png";

function About() {
  return (
    <div className="about-section">
      <img src={laptopWork} width={300} height={300} />
      <div className="about-text">
        <h2 className="about-title">Mission & Iniziativa</h2>

        <p className="about-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quos
          suscipit error. Provident sit, voluptate a repellendus incidunt
          accusantium quam fugiat, eius ratione neque maxime! Neque soluta
          deleniti dolorum a?
        </p>
      </div>
    </div>
  );
}

export default About;
