import { Link, useParams } from 'react-router-dom';
import { productosIniciales } from '../data/productos.js';
import { useCart } from '../context/CartContext.jsx';
import { formatoPrecio } from '../utils/formatoPrecio.js';

function DetalleProducto() {
  const { id } = useParams();
  const producto = productosIniciales.find((item) => item.id === Number(id));
  const { agregarAlCarrito } = useCart();

  if (!producto) {
    return (
      <section className="seccion">
        <h2>Producto no encontrado</h2>
        <Link className="btn-principal" to="/productos">Volver a productos</Link>
      </section>
    );
  }

  return (
    <section className="detalle">
      <img src={producto.imagen} alt={producto.nombre} />
      <div>
        <h2>{producto.nombre}</h2>
        <p>{producto.detalle}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Stock disponible:</strong> {producto.stock}</p>
        <p className="producto-precio">{formatoPrecio(producto.precio)}</p>
        <button className="btn-principal" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
      </div>
    </section>
  );
}

export default DetalleProducto;
