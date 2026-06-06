import { useState, type FormEvent, type ChangeEvent } from 'react'
import { contactAPI } from '../../api/api'
import type { ContactFormData } from '../../types'
import './Form.css'

function ContactForm() {
  const initialForm: ContactFormData = { name: '', email: '', subject: '', message: '' }
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const response = await contactAPI.submit(form)
      setFeedback({ type: 'success', message: response.message })
      setForm(initialForm)
    } catch (error: any) {
      const msg = error.response?.data?.message || "Errore nell'invio del messaggio"
      setFeedback({ type: 'error', message: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-section" className="section">
      <div className="container">
        <h2 className="title">Contattaci</h2>
        
        {feedback && (
          <div className={feedback.type === 'success' ? 'success' : 'error'}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label className="label">Nome *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="input" placeholder="Il tuo nome" />
          </div>
          <div className="field">
            <label className="label">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input" placeholder="La tua email" />
          </div>
          <div className="field">
            <label className="label">Oggetto</label>
            <input type="text" name="subject" value={form.subject} onChange={handleChange} className="input" placeholder="Oggetto del messaggio" />
          </div>
          <div className="field">
            <label className="label">Messaggio *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="input textarea" placeholder="Scrivi il tuo messaggio..." />
          </div>
          <button type="submit" disabled={loading} className="button">
            {loading ? 'Invio in corso...' : 'Invia Messaggio'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm