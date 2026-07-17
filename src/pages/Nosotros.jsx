import { equipo } from '../data/equipo.js';

function Nosotros() {
  return (
    <section className="section nosotros">
      <h2>Nosotros</h2>
      <p>Vinieve es la primer tienda online especializada en productos para esquí y deportes de nieve.</p>
      <p>Da sus primeros pasos ofreciendo chaquetas térmicas, pantalones impermeables, guantes y accesorios de alta calidad. Nuestra pasión por la montaña nos impulsan a equipar a cada aventurero para que conquiste las cumbres nevadas con seguridad, comodidad y estilo.</p>
      <h3>Equipo ViNieve</h3>
      <div className="equipo-grid">{equipo.map((persona) => <div className="equipo-card" key={persona.email}><img src={persona.imagen} alt={persona.nombre} /><h4>{persona.nombre}</h4><p>{persona.puesto}</p><span>{persona.email}</span></div>)}</div>
    </section>
  );
}

export default Nosotros;
