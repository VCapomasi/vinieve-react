import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="Logo de Vinieve" />
          <h1>Vinieve</h1>
        </Link>
      </header>

      <nav className="nav">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
