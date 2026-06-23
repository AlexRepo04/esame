import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import logoWorkSpaceNow from "/logo.png";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <img src={logoWorkSpaceNow} alt="Logo" />
          <p>WorkSpaceNow</p>
        </Link>

        <nav className="site-header__nav">
          <Link to="/" className="site-header__link">
            Home
          </Link>
          <Link to="/space" className="site-header__link">
            Spazi Offerti
          </Link>

          {user ? (
            <div className="site-header__user">
              <Link to="/dashboard" className="site-header__link">
                <p>Dashboard</p>
              </Link>
              <p className="site-header__badge">{user.username}</p>
              <button onClick={logout} className="site-header__logout-btn">
                <p>Logout</p>
              </button>
            </div>
          ) : (
            <Link to="/login" className="site-header__login-btn">
              Login / Registrati
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
