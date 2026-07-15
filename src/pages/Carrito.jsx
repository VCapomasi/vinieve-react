import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { cuponesIniciales } from '../data/productos.js';
import { formatoPrecio } from '../utils/formatoPrecio.js';

function Carrito() {
  const { carrito, subtotal, cambiarCantidad, quitarDelCarrito, vaciarCarrito } = useCart();
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const aplicarCupon = () => {
    const cupon = cuponesIniciales.find((item) => item.codigo === codigo.trim().toUpperCase());
    if (!cupon) {
      alert('Cupón inválido. Probá VINIEVE10 o NIEVE20.');
      setDescuento(0);
      return;
    }
    setDescuento(cupon.descuento);
  };

  const finalizarCompra = () => {
    vaciarCarrito();
    setCompraFinalizada(true);
  };

  const total = subtotal - (subtotal * descuento / 100);

  if (compraFinalizada) {
    return (
      <section className="confirmacion">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido fue procesado correctamente. Te esperamos para seguir equipándote para la nieve.</p>
        <Link to="/productos" className="btn-principal">Seguir comprando</Link>
      </section>
    );
  }

  if (carrito.length === 0) {
    return (
      <section className="carrito">
        <h2>Carrito de compras</h2>
        <p className="estado-carga">Tu carrito está vacío.</p>
        <Link to="/productos" className="btn-principal">Ver productos</Link>
      </section>
    );
  }

  return (
    <section className="carrito">
      <h2>Carrito de compras</h2>
      <div className="carrito-layout">
        <div>
          {carrito.map((item) => (
            <article className="carrito-item" key={item.id}>
              <img src={item.imagen} alt={item.nombre} />
              <div>
                <h3>{item.nombre}</h3>
                <p>{formatoPrecio(item.precio)}</p>
              </div>
              <div className="cantidad">
                <button onClick={() => cambiarCantidad(item.id, 'restar')}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => cambiarCantidad(item.id, 'sumar')}>+</button>
              </div>
              <button className="btn-eliminar" onClick={() => quitarDelCarrito(item.id)}>Eliminar</button>
            </article>
          ))}
        </div>

        <aside className="resumen">
          <h3>Resumen</h3>
          <label>Cupón de descuento</label>
          <input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="VINIEVE10" />
          <button onClick={aplicarCupon}>Aplicar</button>
          <p>Subtotal: {formatoPrecio(subtotal)}</p>
          {descuento > 0 && <p>Descuento: {descuento}%</p>}
          <h3>Total: {formatoPrecio(total)}</h3>
          <button className="btn-principal" onClick={finalizarCompra}>Proceder al pago</button>
          <button className="btn-secundario" onClick={vaciarCarrito}>Vaciar carrito</button>
        </aside>
      </div>
    </section>
  );
}

export default Carrito;
