import { Link } from 'react-router-dom';
import { formatearPrecio } from '../../utils/formatearPrecio.js';
import { useCart } from '../../context/CartContext.jsx';

function Item({ producto }) {
  const { agregarAlCarrito } = useCart();
  return (
    <article className="card">
      <Link to={`/productos/${producto.docId}`}><img src={producto.imagen} alt={producto.nombre} /><h3>{producto.nombre}</h3></Link>
      <p>{producto.categoria}</p>
      <p className="precio">{formatearPrecio(producto.precio)}</p>
      <button className="btn" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </article>
  );
}

export default Item;
