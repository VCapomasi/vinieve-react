import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { formatearPrecio } from '../utils/formatearPrecio.js';

function DetalleProducto() {
  const { id } = useParams();
  const { productos, loading } = useData();
  const { agregarAlCarrito } = useCart();
  const producto = productos.find((p) => p.docId === id);
  if (loading) return <p className="estado">Cargando...</p>;
  if (!producto) return <p className="estado">Producto no encontrado.</p>;
  return (
    <section className="detalle">
      <img src={producto.imagen} alt={producto.nombre} />
      <div><h2>{producto.nombre}</h2><p>{producto.detalle}</p><p>Stock: {producto.stock}</p><p className="precio">{formatearPrecio(producto.precio)}</p><button className="btn" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button></div>
    </section>
  );
}

export default DetalleProducto;
