import type { Space } from "../../types";
import "./SpaceCards.css";

interface spaceCardsProps {
  space: Space[];
  className?: string;
  canDelete?: boolean;
  deletingspaceId?: number | null;
  onDelete?: (spaceId: number) => void;
}

function spaceCards({
  space,
  className = "",
  canDelete = false,
  deletingspaceId = null,
  onDelete,
}: spaceCardsProps) {
  const gridClassName = ["space-cards", className].filter(Boolean).join(" ");

  return (
    <div className={gridClassName}>
      {space.map((space) => (
        <article key={space.id} className="space-cards__card">
          {space.imageUrl ? (
            <img
              src={space.imageUrl}
              alt={space.title}
              className="space-cards__image"
            />
          ) : (
            <div
              className="space-cards__image space-cards__image-placeholder"
              aria-label={`Immagine non disponibile per ${space.title}`}
              role="img"
            >
              <span>Nessuna immagine</span>
            </div>
          )}

          <div className="space-cards__body">
            <h3 className="space-cards__title">{space.title}</h3>
            <p className="space-cards__desc">{space.description}</p>
            <p className="space-cards__desc">{space.servizi}</p>
            <div className="space-cards__citta">{space.citta}</div>
          </div>

          {canDelete && onDelete && (
            <button
              type="button"
              className="space-cards__delete-button"
              disabled={deletingspaceId === space.id}
              onClick={() => onDelete(space.id)}
            >
              {deletingspaceId === space.id ? "Eliminazione..." : "Elimina"}
            </button>
          )}
        </article>
      ))}
    </div>
  );
}

export default spaceCards;
