import {
  useState,
  useEffect,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
import { spaceAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { Space, SpaceFormData } from "../types";
import SpaceCards from "../components/SpaceCards/SpaceCards";
import "../style/SpacePage.css";

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
      <input className="space-page__input" {...props} />
    </div>
  );
}

function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="space-page__button" {...props}>
      {children}
    </button>
  );
}

async function fetchSpaces() {
  try {
    const response = await spaceAPI.getAll();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Errore caricamento spazi", error);
    return [];
  }
}

function SpacePage() {
  const [Spaces, setSpaces] = useState<Space[]>([]);
  const { user } = useAuth();
  const [form, setForm] = useState<SpaceFormData>({
    title: "",
    citta: "",
    description: "",
    servizi: "",
  });
  const [loading, setLoading] = useState(false);
  const [deletingSpaceId, setDeletingSpaceId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchSpaces().then((data) => {
      if (isMounted) {
        setSpaces(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "name" ? Number(value) : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await spaceAPI.create(form);
      setForm({ title: "", citta: "", description: "", servizi: "" });
      setSpaces(await fetchSpaces());
    } catch (error) {
      console.error("Errore creazione spazio", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (SpaceId: number) => {
    setDeletingSpaceId(SpaceId);
    try {
      await spaceAPI.delete(SpaceId);
      setSpaces((currentSpaces) =>
        currentSpaces.filter((Space) => Space.id !== SpaceId),
      );
    } catch (error) {
      console.error("Errore eliminazione spazio", error);
    } finally {
      setDeletingSpaceId(null);
    }
  };

  return (
    <div className="space-page">
      <h1 className="space-page__title">I Nostri Spazi</h1>

      {/* Cards dinamiche dal Backend */}
      {Spaces.length > 0 ? (
        <SpaceCards
          space={Spaces}
          className="space-page__cards"
          canDelete={Boolean(user)}
          deletingspaceId={deletingSpaceId}
          onDelete={handleDelete}
        />
      ) : (
        <p className="Spaces-page__empty">Nessuno spazio disponibile.</p>
      )}

      {/* Form per aggiungere prodotto */}
      {user && (
        <div className="space-page__form-section">
          <h2>Aggiungi Spazi</h2>
          <form onSubmit={handleSubmit} className="space-page__form">
            <Input
              label="Titolo"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nome spazio"
              required
            />
            <Input
              label="Città"
              type="text"
              name="citta"
              value={form.citta}
              onChange={handleChange}
              placeholder="e.g. Milano"
              required
            />
            <Input
              label="Descrizione"
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrizione spazio"
            />
            <Input
              label="Servizi"
              type="text"
              name="servizi"
              value={form.servizi}
              onChange={handleChange}
              placeholder="elenca i servizi"
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
              {loading ? "Salvataggio..." : "Crea Spazio"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SpacePage;
