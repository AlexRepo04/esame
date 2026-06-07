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
    <section id="contact-section" className="contact">
      <div className="contact__container">
        <h2 className="contact__title">Contattaci</h2>
        
        {feedback && (
          <div className={`contact__feedback ${feedback.type === 'success' ? 'contact__feedback--success' : 'contact__feedback--error'}`}>
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact__form">
          <div className="contact__field">
            <label className="contact__label">Nome *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="contact__input" placeholder="Il tuo nome" />
          </div>
          <div className="contact__field">
            <label className="contact__label">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="contact__input" placeholder="La tua email" />
          </div>
          <div className="contact__field">
            <label className="contact__label">Oggetto</label>
            <input type="text" name="subject" value={form.subject} onChange={handleChange} className="contact__input" placeholder="Oggetto del messaggio" />
          </div>
          <div className="contact__field">
            <label className="contact__label">Messaggio *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="contact__input contact__textarea" placeholder="Scrivi il tuo messaggio..." />
          </div>
          <button type="submit" disabled={loading} className="contact__submit">
            {loading ? 'Invio in corso...' : 'Invia Messaggio'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm