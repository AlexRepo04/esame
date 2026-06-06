import './Cards.css'

// Interfaccia per le Props della singola Card
interface CardItemProps {
  img: string
  title: string
  desc: string
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
  )
}

export default function Cards() {
  // Dati delle cards. Puoi spostarli anche in un file esterno o prenderli da un'API!
  const cardsData = [
    {
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
      title: 'Codice Pulito',
      desc: 'Struttura modulare e componenti riutilizzabili per uno sviluppo veloce.'
    },
    {
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
      title: 'Sicurezza JWT',
      desc: 'Autenticazione sicura e gestione sessioni integrata nel backend.'
    },
    {
      img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
      title: 'Pronto per la Produzione',
      desc: 'Configurazione ottimale di React, Vite e Spring Boot per partire col piede giusto.'
    }
  ]

  return (
    <section className="cards">
      <div className="container">
        <h2 className="title">I Nostri Servizi</h2>
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
  )
}