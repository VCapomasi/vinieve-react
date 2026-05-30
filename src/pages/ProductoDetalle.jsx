import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el detalle del producto');
        }
        return respuesta.json();
      })
      .then((data) => {
        const productoEncontrado = data.find((item) => item.id === parseInt(id));
        setProducto(productoEncontrado);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h2 className="detalle-page">Cargando producto...</h2>;
  if (error) return <h2 className="detalle-page">Error: {error}</h2>;
  if (!producto) return <h2 className="detalle-page">Producto no encontrado</h2>;

  return (
    <section className="detalle-page">
      <div className="detalle-card">
        <img src={producto.imagen} alt={producto.nombre} />

        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <p><strong>Stock disponible:</strong> {producto.stock}</p>
          <div className="detalle-precio">${producto.precio.toLocaleString('es-AR')}</div>
          <button className="btn">Comprar</button>
          <br /><br />
          <Link to="/productos">Volver a productos</Link>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;
