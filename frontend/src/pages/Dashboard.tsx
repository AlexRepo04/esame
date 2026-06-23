import { useState, useEffect } from "react";
import { contactAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { Contact } from "../types";
import "../style/Dashboard.css";

async function fetchContacts() {
  try {
    const data = await contactAPI.getAll();
    return {
      contacts: Array.isArray(data) ? data : [],
      error: null,
    };
  } catch {
    return {
      contacts: [],
      error: "Errore nel caricamento dei contatti",
    };
  }
}

function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    fetchContacts().then((result) => {
      if (!isMounted) {
        return;
      }

      setContacts(result.contacts);
      setError(result.error);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-page__title">Dashboard</h1>
      <p className="dashboard-page__welcome">
        Benvenuto, <strong>{user?.username}</strong>!
      </p>

      {loading && (
        <p className="dashboard-page__loading">Caricamento contatti...</p>
      )}
      {error && <div className="dashboard-page__error">{error}</div>}

      {!loading && !error && contacts.length === 0 && (
        <div className="dashboard-page__empty">
          <p>Nessun messaggio ricevuto.</p>
        </div>
      )}

      {!loading && contacts.length > 0 && (
        <div>
          <h2 className="dashboard-page__subtitle">
            Messaggi ricevuti ({contacts.length})
          </h2>
          {contacts.map((contact) => (
            <div key={contact.id} className="dashboard-card">
              <div className="dashboard-card__header">
                <strong>{contact.name}</strong>
                <span className="dashboard-card__date">
                  {new Date(contact.createdAt).toLocaleString("it-IT")}
                </span>
              </div>
              <div className="dashboard-card__email">{contact.email}</div>
              {contact.spazioSelezionato && (
                <div className="dashboard-card__subject">
                  {contact.spazioSelezionato}
                </div>
              )}

              <div className="dashboard-card__message">
                {contact.descrizioneAttivita}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
