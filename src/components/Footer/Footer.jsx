import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div><Link to="/">Inicio</Link><Link to="/productos">Productos</Link><Link to="/nosotros">Nosotros</Link><Link to="/contacto">Contacto</Link></div>
      <div><img src="/images/logo.png" alt="Vinieve" /><h2>Vinieve</h2></div>
      <div><p>Email: info@vinieve.com</p><p>Tel: +34 011 4123 5456</p><p>Horario: Lun-Vie 9:00-18:00</p></div>
      <p className="copy">© 2026 Vinieve. Desarrollado por <a href="https://www.instagram.com/pypyana/" target="_blank" rel="noreferrer">@pypyana</a></p>
    </footer>
  );
}

export default Footer;
