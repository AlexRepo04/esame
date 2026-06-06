import { useState, useEffect } from 'react'
import { contactAPI } from '../../api/api'
import { useAuth } from '../../context/AuthContext'
import type { Contact } from '../../types'
import './Dashboard.css'

function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      // L'API ti restituisce già l'array diretto, niente .data!
      const data = await contactAPI.getAll()
      
      // Ultra-sicurezza: controlliamo che sia un array, se no diamo un array vuoto
      setContacts(Array.isArray(data) ? data : [])
    } catch {
      setError('Errore nel caricamento dei contatti')
      setContacts([]) // Previene il crash se la chiamata fallisce
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1 className="title">📊 Dashboard</h1>
      <p className="welcome">
        Benvenuto, <strong>{user?.username}</strong>!
      </p>

      {loading && <p style={{ color: '#888' }}>Caricamento contatti...</p>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && contacts.length === 0 && (
        <div className="empty">
          <p>Nessun messaggio ricevuto.</p>
        </div>
      )}

      {!loading && contacts.length > 0 && (
        <div>
          <h2 className="subtitle">📩 Messaggi ricevuti ({contacts.length})</h2>
          {contacts.map((contact) => (
            <div key={contact.id} className="card">
              <div className="cardHeader">
                <strong>{contact.name}</strong>
                <span className="date">{new Date(contact.createdAt).toLocaleString('it-IT')}</span>
              </div>
              <div className="cardEmail">{contact.email}</div>
              {contact.subject && <div className="cardSubject">📌 {contact.subject}</div>}
              <div className="cardMessage">{contact.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard