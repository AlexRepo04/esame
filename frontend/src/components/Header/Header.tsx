import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          🚀 Template
        </Link>
        
        <nav className="nav">
          <Link to="/" className="navLink">Home</Link>
          <Link to="/products" className="navLink">Prodotti</Link> {/* <-- AGGIUNTO */}

          {user ? (
            <div className="userInfo">
              <Link to="/dashboard" className="navLink">Dashboard</Link>
              <span className="userBadge">👤 {user.username}</span>
              <button onClick={logout} className="btnLogout">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btnLogin">
              Login / Registrati
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header