import { Link } from 'react-router-dom';
import { formatoPrecio } from '../../utils/formatoPrecio.js';

function Item({ producto }) {
  return (
    <article className="producto-card">
      <div className="producto-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.detalle}</p>
        <p className="stock">Stock disponible: {producto.stock}</p>
        <p className="producto-precio">{formatoPrecio(producto.precio)}</p>
        <Link to={`/producto/${producto.id}`} className="btn-comprar">Ver detalle</Link>
      </div>
    </article>
  );
}

export default Item;
