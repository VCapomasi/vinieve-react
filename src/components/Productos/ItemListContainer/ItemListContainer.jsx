import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

function ItemListContainer({ mensaje = 'Productos' }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los productos');
        }
        return respuesta.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="estado-carga">Cargando productos...</p>;
  if (error) return <p className="estado-error">Error: {error}</p>;

  return (
    <section className="productos-section">
      <h2>{mensaje}</h2>
      <ItemList productos={productos} />
    </section>
  );
}

export default ItemListContainer;
