import { Link } from 'react-router-dom';
import ItemListContainer from '../components/Productos/ItemListContainer.jsx';

function Inicio() {
  return (
    <>
      <section className="hero">
        <div>
          <h2>Equipamiento para disfrutar la nieve</h2>
          <p>Indumentaria y accesorios para esquí, snowboard y montaña.</p>
          <Link to="/productos" className="btn-principal">Ver productos</Link>
        </div>
      </section>
      <ItemListContainer mensaje="Productos destacados" destacados />
    </>
  );
}

export default Inicio;
