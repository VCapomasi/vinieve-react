import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { formatearPrecio } from '../utils/formatearPrecio.js';

function Carrito() {
  const { carrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, subtotal } = useCart();
  const { cupones } = useData();
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const aplicarCupon = () => {
    const cupon = cupones.find((c) => c.codigo.toUpperCase() === codigo.toUpperCase());
    if (!cupon) return alert('Cupón inválido.');
    setDescuento(Number(cupon.descuento));
  };

  const total = subtotal - subtotal * descuento / 100;
  if (finalizado) return <section className="section confirmacion"><h2>¡Gracias por tu compra!</h2><p>Tu pedido fue procesado correctamente. Te esperamos para seguir equipándote para la nieve.</p><Link className="btn" to="/productos">Seguir comprando</Link></section>;
  if (carrito.length === 0) return <section className="section"><h2>Carrito</h2><p>Tu carrito está vacío.</p><Link className="btn" to="/productos">Ver productos</Link></section>;

  return (
    <section className="section carrito">
      <h2>Carrito de compras</h2>
      {carrito.map((item) => <div className="carrito-item" key={item.docId}><img src={item.imagen} alt={item.nombre} /><div><h3>{item.nombre}</h3><p>{formatearPrecio(item.precio)}</p></div><input type="number" min="1" value={item.cantidad} onChange={(e) => cambiarCantidad(item.docId, Number(e.target.value))} /><button onClick={() => eliminarDelCarrito(item.docId)}>Eliminar</button></div>)}
      <div className="resumen"><input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Cupón" /><button onClick={aplicarCupon}>Aplicar cupón</button><p>Subtotal: {formatearPrecio(subtotal)}</p><p>Descuento: {descuento}%</p><h3>Total: {formatearPrecio(total)}</h3><button className="btn" onClick={() => { vaciarCarrito(); setFinalizado(true); }}>Proceder al pago</button><button className="btn secondary" onClick={vaciarCarrito}>Vaciar carrito</button></div>
    </section>
  );
}

export default Carrito;
