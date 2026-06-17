import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../../api/api";
import type { Product } from "../../types";
import ProductCards from "../ProductCards/ProductCards";
import "./FeaturedProducts.css";

// Definizione delle Props del componente
interface FeaturedProductsProps {
  limit?: number; // Opzionale, default = 3
}

function FeaturedProducts({ limit = 3 }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAll();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Errore caricamento prodotti", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Prende solo il numero di prodotti richiesto dal limite
  const displayedProducts = products.slice(0, limit);

  return (
    <section className="featured-products">
      <div className="featured-products__container">
        <h2 className="featured-products__title">I Nostri Prodotti</h2>

        {loading && (
          <p className="featured-products__loading">Caricamento in corso...</p>
        )}

        {!loading && displayedProducts.length === 0 && (
          <p className="featured-products__empty">
            Nessun prodotto disponibile.{" "}
            <Link to="/products" className="featured-products__empty-link">
              Aggiungine uno!
            </Link>
          </p>
        )}

        <ProductCards products={displayedProducts} />
      </div>
    </section>
  );
}

export default FeaturedProducts;
