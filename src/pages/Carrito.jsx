import { Link } from 'react-router-dom';

function Carrito() {
  return (
    <section className="carrito-page">
      <h2>Carrito de compras</h2>
      <p>
        La funcionalidad completa del carrito estará disponible en la próxima etapa del proyecto.
      </p>
      <br />
      <Link to="/productos" className="btn">Volver al catálogo</Link>
    </section>
  );
}

export default Carrito;
