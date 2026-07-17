import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';
import Item from '../components/Productos/Item.jsx';

function Home() {
  const { productos } = useData();
  const destacados = productos.filter((p) => p.destacado).slice(0, 4);
  return (
    <>
      <section className="hero"><div><h2>Equipate para la nieve</h2><p>Indumentaria y accesorios para esquí, snowboard y deportes de montaña.</p><Link className="btn" to="/productos">Ver productos</Link></div></section>
      <section className="section"><h2>Productos destacados</h2><div className="grid">{destacados.map((producto) => <Item producto={producto} key={producto.docId} />)}</div></section>
    </>
  );
}

export default Home;
