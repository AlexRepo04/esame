import Hero from '../components/Hero/Hero'
import Cards from '../components/Cards/Cards'
import ContactForm from '../components/Form/Form'
import FeaturedProducts from '../components/Products/FeaturedProducts'

function Home() {
  return (
    <div>
      <Hero />
      <Cards />
      <FeaturedProducts limit={3} /> 
      <ContactForm />
    </div>
  )
}

export default Home