import {
  useState,
  useEffect,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
import { productAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { Product, ProductFormData } from "../types";
import ProductCards from "../components/ProductCards/ProductCards";
import "../style/ProductPage.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          {label}
        </label>
      )}
      <input className="products-page__input" {...props} />
    </div>
  );
}

function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="products-page__button" {...props}>
      {children}
    </button>
  );
}

async function fetchProducts() {
  try {
    const response = await productAPI.getAll();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Errore caricamento prodotti", error);
    return [];
  }
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();
  const [form, setForm] = useState<ProductFormData>({
    title: "",
    description: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;

    fetchProducts().then((data) => {
      if (isMounted) {
        setProducts(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productAPI.create(form);
      setForm({ title: "", description: "", price: 0 });
      setProducts(await fetchProducts());
    } catch (error) {
      console.error("Errore creazione prodotto", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    setDeletingProductId(productId);
    try {
      await productAPI.delete(productId);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId),
      );
    } catch (error) {
      console.error("Errore eliminazione prodotto", error);
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="products-page">
      <h1 className="products-page__title">I Nostri Prodotti</h1>

      {/* Cards dinamiche dal Backend */}
      <ProductCards
        products={products}
        className="products-page__cards"
        canDelete={Boolean(user)}
        deletingProductId={deletingProductId}
        onDelete={handleDelete}
      />

      {/* Form per aggiungere prodotto */}
      <div className="products-page__form-section">
        <h2>Aggiungi Prodotto</h2>
        <form onSubmit={handleSubmit} className="products-page__form">
          <Input
            label="Titolo"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nome prodotto"
            required
          />
          <Input
            label="Descrizione"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrizione prodotto"
          />
          <Input
            label="Prezzo (€)"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />

          <Input
            label="URL Immagine"
            type="text"
            name="imageUrl"
            value={form.imageUrl || ""}
            onChange={handleChange}
            placeholder="https://sito.com/immagine.jpg"
          />

          <Button disabled={loading}>
            {loading ? "Salvataggio..." : "Crea Prodotto"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProductsPage;
