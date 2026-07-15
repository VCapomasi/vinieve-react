import { useEffect, useState } from 'react';
import ItemList from './ItemList.jsx';
import { productosIniciales } from '../../data/productos.js';

function ItemListContainer({ mensaje = 'Nuestros productos', destacados = false }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargarProductos = () => {
      setLoading(true);
      const lista = destacados ? productosIniciales.slice(0, 3) : productosIniciales;
      setProductos(lista);
      setLoading(false);
    };

    cargarProductos();
  }, [destacados]);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="productos-section">
      <h2>{mensaje}</h2>
      {!destacados && (
        <input
          className="buscador"
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      )}
      {loading ? <p className="estado-carga">Cargando productos...</p> : <ItemList productos={productosFiltrados} />}
    </section>
  );
}

export default ItemListContainer;
