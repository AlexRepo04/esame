import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../style/Login.css'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true) // true = Login, false = Register
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      if (isLogin) {
        // Chiamata API di Login
        await login(form.username, form.password)
      } else {
        // Chiamata API di Registrazione
        await register(form.username, form.email, form.password)
      }
      navigate('/dashboard') // Reindirizza alla dashboard se successo
    } catch (error: any) {
      // Cattura l'errore dal backend (es. "Username già esistente" o "Credenziali non valide")
      const msg = error.response?.data?.message || 'Si è verificato un errore. Riprova.'
      setFeedback(msg)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFeedback(null) // Pulisce gli errori quando si cambia modalità
    setForm({ username: '', email: '', password: '' }) // Resetta il form
  }

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <h1 className="auth-page__title">{isLogin ? '🔐 Login' : '📝 Registrati'}</h1>
        
        {feedback && <div className="auth-page__feedback">{feedback}</div>}

        <form onSubmit={handleSubmit} className="auth-page__form">
          <div className="auth-page__field">
            <label className="auth-page__label">Username</label>
            <input 
              type="text" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              required 
              minLength={3}
              className="auth-page__input" 
              placeholder="Il tuo username" 
            />
          </div>
          
          {/* Mostra il campo Email solo se siamo in modalità Registrazione */}
          {!isLogin && (
            <div className="auth-page__field">
              <label className="auth-page__label">Email</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                className="auth-page__input" 
                placeholder="La tua email" 
              />
            </div>
          )}

          <div className="auth-page__field">
            <label className="auth-page__label">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              minLength={6}
              className="auth-page__input" 
              placeholder="Minimo 6 caratteri" 
            />
          </div>

          <button type="submit" disabled={loading} className="auth-page__submit">
            {loading ? 'Attendi...' : (isLogin ? 'Accedi' : 'Crea Account')}
          </button>
        </form>

        <p className="auth-page__toggle-text">
          {isLogin ? "Non hai un account?" : "Hai già un account?"}
          <button onClick={toggleMode} className="auth-page__toggle-button">
            {isLogin ? 'Registrati' : 'Accedi'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage