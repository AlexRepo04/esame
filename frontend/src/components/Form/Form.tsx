import { useState, type FormEvent, type ChangeEvent } from "react";
import { contactAPI } from "../../api/api";
import type { ContactFormData } from "../../types";
import "./Form.css";

function ContactForm() {
  const initialForm: ContactFormData = {
    name: "",
    email: "",
    citta: "",
    spazioSelezionato: "",
    nPersone: "",
    descrizioneAttivita: "",
  };
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const response = await contactAPI.submit(form);
      setFeedback({ type: "success", message: response.message });
      setForm(initialForm);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Errore nell'invio del messaggio";
      setFeedback({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="contact">
      <div className="contact__container">
        <h2 className="contact__title">
          Richiedi ora il tuo spazio di coworking:
        </h2>

        {feedback && (
          <div
            className={`contact__feedback ${feedback.type === "success" ? "contact__feedback--success" : "contact__feedback--error"}`}
          >
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact__form">
          <div className="contact__field">
            <label className="contact__label">Nome *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="contact__input"
              placeholder="Il tuo nome, o quello dell'azienda"
            />
          </div>
          <div className="contact__field">
            <label className="contact__label">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="contact__input"
              placeholder="La tua email"
            />
          </div>
          <div className="contact__field">
            <label className="contact__label">Città *</label>
            <input
              type="text"
              name="citta"
              value={form.citta}
              onChange={handleChange}
              required
              className="contact__input"
              placeholder="Inserisci la città"
            />
          </div>
          <div className="contact__field">
            <label className="contact__label">Spazio Selezionato *</label>
            <input
              type="text"
              name="spazioSelezionato"
              value={form.spazioSelezionato}
              required
              onChange={handleChange}
              className="contact__input"
              placeholder="scegli lo spazio selezionato"
            />
          </div>
          <div className="contact__field">
            <label className="contact__label">Numero Persone *</label>
            <input
              type="text"
              name="nPersone"
              value={form.nPersone}
              onChange={handleChange}
              className="contact__input"
              placeholder="scegli lo spazio selezionato"
            />
          </div>
          <div className="contact__field">
            <label className="contact__label">Descrizione Attività *</label>
            <textarea
              name="descrizioneAttivita"
              value={form.descrizioneAttivita}
              onChange={handleChange}
              required
              rows={5}
              className="contact__input contact__textarea"
              placeholder="Descrivi le tue attività..."
            />
          </div>
          <button type="submit" disabled={loading} className="contact__submit">
            {loading ? "Invio in corso..." : "Invia Messaggio"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
