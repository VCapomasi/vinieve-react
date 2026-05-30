import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const equipo = [
    {
      id: 1,
      nombre: 'Ana Torres',
      puesto: 'Dirección e-commerce',
      email: 'ana@vinieve.com',
      imagen: '/images/equipo-ana.jpg'
    },
    {
      id: 2,
      nombre: 'Martina López',
      puesto: 'Atención al cliente',
      email: 'martina@vinieve.com',
      imagen: '/images/equipo-martina.jpg'
    },
    {
      id: 3,
      nombre: 'Julián Ríos',
      puesto: 'Logística y envíos',
      email: 'julian@vinieve.com',
      imagen: '/images/equipo-julian.jpg'
    }
  ];

  return (
    <footer className="footer">
      <div className="equipo-footer">
        <h3>Equipo</h3>

        <div className="equipo-grid">
          {equipo.map((persona) => (
            <div className="equipo-card" key={persona.id}>
              <img
                src={persona.imagen}
                alt={`${persona.nombre} - ${persona.puesto}`}
                className="equipo-img"
              />

              <h4>{persona.nombre}</h4>
              <p>{persona.puesto}</p>
              <span>{persona.email}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h3>Vinieve</h3>
          <p>
            Tienda online especializada en indumentaria y accesorios para esquí y deportes de nieve.
          </p>
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
        <p>&copy; 2026 Vinieve. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;