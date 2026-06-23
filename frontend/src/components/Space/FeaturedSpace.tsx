import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { spaceAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import type { Space } from "../../types";
import SpaceCards from "../SpaceCards/SpaceCards";
import "./FeaturedSpace.css";

// Definizione delle Props del componente
interface FeaturedspaceProps {
  limit?: number; // Opzionale, default = 3
}

function Featuredspace({ limit = 3 }: FeaturedspaceProps) {
  const [space, setspace] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchspace = async () => {
      try {
        const data = await spaceAPI.getAll();
        setspace(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Errore caricamento prodotti", error);
        setspace([]);
      } finally {
        setLoading(false);
      }
    };
    fetchspace();
  }, []);

  // Prende solo il numero di prodotti richiesto dal limite
  const displayedspace = space.slice(0, limit);

  return (
    <section className="featured-space">
      <div className="featured-space__container">
        <h2 className="featured-space__title">I Nostri Spazi disponibili</h2>

        {loading && (
          <p className="featured-space__loading">Caricamento in corso...</p>
        )}

        {!loading && displayedspace.length === 0 && (
          <p className="featured-space__empty">
            Nessuno spazio disponibile.
            {user && (
              <>
                {" "}
                <Link to="/space" className="featured-space__empty-link">
                  Aggiungine uno!
                </Link>
              </>
            )}
          </p>
        )}

        <SpaceCards space={displayedspace} />
      </div>
    </section>
  );
}

export default Featuredspace;
