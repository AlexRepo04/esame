import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import { productAPI } from '../api/api'
import type { Product, ProductFormData } from '../types'
import './ProductPage.css'

// Minimal UI helpers so the page can render without external UI components
function Input({ label, ...props }: any) {
  return (
    <div>
      {label && <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>{label}</label>}
      <input className="input" {...props} />
    </div>
  )
}

function Button({ children, ...props }: any) {
  return (
    <button className="button" {...props}>{children}</button>
  )
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductFormData>({ title: '', description: '', price: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await productAPI.getAll()
      setProducts(response)
    } catch (error) {
      console.error('Errore caricamento prodotti', error)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'price' ? Number(value) : value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await productAPI.create(form)
      setForm({ title: '', description: '', price: 0 })
      loadProducts() // Ricarica la lista dopo l'inserimento
    } catch (error) {
      console.error('Errore creazione prodotto', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1 className="title">🛍️ I Nostri Prodotti</h1>
      
      {/* Cards dinamiche dal Backend */}
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3 className="cardTitle">{product.title}</h3>
            <p className="cardDesc">{product.description}</p>
            <div className="cardPrice">€ {product.price.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Form per aggiungere prodotto */}
      <div className="formSection">
        <h2>Aggiungi Prodotto</h2>
        <form onSubmit={handleSubmit} className="form">
          <Input label="Titolo" type="text" name="title" value={form.title} onChange={handleChange} placeholder="Nome prodotto" required />
          <Input label="Descrizione" type="text" name="description" value={form.description} onChange={handleChange} placeholder="Descrizione prodotto" />
          <Input label="Prezzo (€)" type="number" name="price" value={form.price} onChange={handleChange} placeholder="0.00" required />
          <Button disabled={loading}>{loading ? 'Salvataggio...' : 'Crea Prodotto'}</Button>
        </form>
      </div>
    </div>
  )
}

export default ProductsPage