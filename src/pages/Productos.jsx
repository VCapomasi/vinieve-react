import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useData } from '../context/DataContext.jsx';
import Item from '../components/Productos/Item.jsx';

function Productos() {
  const { productos, loading, error } = useData();
  const [busqueda, setBusqueda] = useState('');
  const filtrados = productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.categoria.toLowerCase().includes(busqueda.toLowerCase()));
  if (loading) return <p className="estado">Cargando productos...</p>;
  if (error) return <p className="estado error">{error}</p>;
  return (
    <section className="section">
      <h2>Productos</h2>
      <div className="buscador"><FaSearch /><input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar producto..." /></div>
      <div className="grid">{filtrados.map((producto) => <Item producto={producto} key={producto.docId} />)}</div>
    </section>
  );
}

export default Productos;
