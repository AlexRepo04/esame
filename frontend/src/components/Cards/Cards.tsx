import "./Cards.css";

// Interfaccia per le Props della singola Card
interface CardItemProps {
  img: string;
  title: string;
  desc: string;
}

// Componente Card Singola
function CardItem({ img, title, desc }: CardItemProps) {
  return (
    <div className="card">
      <img src={img} alt={title} className="cardImage" />
      <div className="cardBody">
        <h3 className="cardTitle">{title}</h3>
        <p className="cardDesc">{desc}</p>
      </div>
    </div>
  );
}

export default function Cards() {
  // Dati delle cards. Puoi spostarli anche in un file esterno o prenderli da un'API!
  const cardsData = [
    {
      img: "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Titolo Card",
      desc: "Desc Card",
    },
    {
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Titolo Card",
      desc: "Desc Card",
    },
    {
      img: "https://images.unsplash.com/photo-1600765728673-7b4aa76cc3ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Titolo Card",
      desc: "Desc Card",
    },
  ];

  return (
    <section className="cards">
      <div className="container">
        <h2 className="title">I Nostri Vantaggi</h2>
        <div className="grid">
          {cardsData.map((card, index) => (
            <CardItem
              key={index}
              img={card.img}
              title={card.title}
              desc={card.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
