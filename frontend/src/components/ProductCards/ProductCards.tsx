import type { Product } from "../../types";
import "./ProductCards.css";

interface ProductCardsProps {
  products: Product[];
  className?: string;
  canDelete?: boolean;
  deletingProductId?: number | null;
  onDelete?: (productId: number) => void;
}

function ProductCards({
  products,
  className = "",
  canDelete = false,
  deletingProductId = null,
  onDelete,
}: ProductCardsProps) {
  const gridClassName = ["product-cards", className].filter(Boolean).join(" ");

  return (
    <div className={gridClassName}>
      {products.map((product) => (
        <article key={product.id} className="product-cards__card">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="product-cards__image"
            />
          ) : (
            <div
              className="product-cards__image product-cards__image-placeholder"
              aria-label={`Immagine non disponibile per ${product.title}`}
              role="img"
            >
              <span>Nessuna immagine</span>
            </div>
          )}

          <div className="product-cards__body">
            <h3 className="product-cards__title">{product.title}</h3>
            <p className="product-cards__desc">{product.description}</p>
            <div className="product-cards__price">
              € {product.price.toFixed(2)}
            </div>
          </div>

          {canDelete && onDelete && (
            <button
              type="button"
              className="product-cards__delete-button"
              disabled={deletingProductId === product.id}
              onClick={() => onDelete(product.id)}
            >
              {deletingProductId === product.id ? "Eliminazione..." : "Elimina"}
            </button>
          )}
        </article>
      ))}
    </div>
  );
}

export default ProductCards;
