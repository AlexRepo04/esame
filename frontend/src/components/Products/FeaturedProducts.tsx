import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productAPI } from '../../api/api'
import type { Product } from '../../types'
import './FeaturedProducts.css'

// Definizione delle Props del componente
interface FeaturedProductsProps {
  limit?: number // Opzionale, default = 3
}

function FeaturedProducts({ limit = 3 }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAll()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Errore caricamento prodotti', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Prende solo il numero di prodotti richiesto dal limite
  const displayedProducts = products.slice(0, limit)

  return (
    <section className="section">
      <div className="container">
        <h2 className="title">I Nostri Prodotti</h2>
        
        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Caricamento in corso...</p>}
        
        {!loading && displayedProducts.length === 0 && (
          <p className="emptyMessage">
            Nessun prodotto disponibile. <Link to="/products" className="emptyLink">Aggiungine uno!</Link>
          </p>
        )}

        <div className="grid">
          {displayedProducts.map((product) => (
            <div key={product.id} className="card-product">
              <h3 className="card-productTitle">{product.title}</h3>
              <p className="card-productDesc">{product.description}</p>
              <div className="card-productPrice">€ {product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts