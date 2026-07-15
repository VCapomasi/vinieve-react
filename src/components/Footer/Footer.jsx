import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-nav">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer-logo">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo Vinieve" />
            <h2>Vinieve</h2>
          </Link>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>
            Email: info@vinieve.com<br />
            Tel: +34 011 4123 5456<br />
            Horario: Lun-Vie 9:00-18:00
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Vinieve. Todos los derechos reservados.</p>
        <p>Desarrollado por <a href="https://www.instagram.com/pypyana/" target="_blank" rel="noreferrer">@pypyana</a></p>
      </div>
    </footer>
  );
}

export default Footer;
