import Hero from "../components/Hero/Hero";
import Cards from "../components/Cards/Cards";
import ContactForm from "../components/Form/Form";
import Featuredspace from "../components/Space/FeaturedSpace";
import About from "../components/About/About";

function Home() {
  return (
    <div>
      <Hero />
      <About></About>
      <Featuredspace limit={3} />
      <Cards />
      <ContactForm />
    </div>
  );
}

export default Home;
