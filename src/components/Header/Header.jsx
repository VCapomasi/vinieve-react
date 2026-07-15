import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

function Header() {
  const { usuario, logout } = useAuth();
  const { totalItems } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo" onClick={cerrarMenu}>
          <img src="/images/logo.png" alt="Logo Vinieve" />
          <h1>Vinieve</h1>
        </Link>
      </header>

      <nav className="nav">
        <button
          className={`hamburger ${menuAbierto ? 'active' : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuAbierto ? 'active' : ''}`}>
          <li><NavLink onClick={cerrarMenu} to="/">Inicio</NavLink></li>
          <li><NavLink onClick={cerrarMenu} to="/productos">Productos</NavLink></li>
          <li><NavLink onClick={cerrarMenu} to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink onClick={cerrarMenu} to="/contacto">Contacto</NavLink></li>
          {usuario?.rol === 'admin' && (
            <>
              <li><NavLink onClick={cerrarMenu} to="/gestion">Gestión</NavLink></li>
              <li><NavLink onClick={cerrarMenu} to="/cupones">Cupones</NavLink></li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          <Link to="/carrito" className="icon-link" aria-label="Carrito" onClick={cerrarMenu}>
            🛒 {totalItems > 0 && <span>{totalItems}</span>}
          </Link>
          {usuario ? (
            <button className="btn-cuenta" onClick={logout}>Salir</button>
          ) : (
            <Link to="/login" className="btn-cuenta" onClick={cerrarMenu}>Mi cuenta</Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
