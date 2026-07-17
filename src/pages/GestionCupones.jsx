import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

function GestionCupones() {
  const { cupones, guardarCupon, eliminarCupon } = useData();
  const estadoInicial = { codigo: '', descuento: '' };
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [cuponAEditar, setCuponAEditar] = useState(null);

  const manejarCambio = (e) => setDatosForm({ ...datosForm, [e.target.name]: e.target.value });
  const editarCupon = (cupon) => { setCuponAEditar(cupon); setDatosForm(cupon); };
  const cancelar = () => { setCuponAEditar(null); setDatosForm(estadoInicial); };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!datosForm.codigo || Number(datosForm.descuento) < 1 || Number(datosForm.descuento) > 100) return alert('Complete código y descuento entre 1 y 100.');
    await guardarCupon(datosForm);
    cancelar();
  };

  return (
    <section className="section admin">
      <h2>Gestión de cupones</h2>
      <form className="admin-form" onSubmit={manejarEnvio}>
        <input name="codigo" value={datosForm.codigo} onChange={manejarCambio} placeholder="Código" />
        <input name="descuento" type="number" value={datosForm.descuento} onChange={manejarCambio} placeholder="Descuento" />
        <button className="btn">{cuponAEditar ? 'Actualizar cupón' : 'Crear cupón'}</button>
        {cuponAEditar && <button type="button" className="btn secondary" onClick={cancelar}>Cancelar</button>}
      </form>
      <div className="admin-list">{cupones.map((cupon) => <div key={cupon.docId}><strong>{cupon.codigo}</strong><span>{cupon.descuento}%</span><button onClick={() => editarCupon(cupon)}>Editar</button><button onClick={() => eliminarCupon(cupon.docId)}>Eliminar</button></div>)}</div>
    </section>
  );
}

export default GestionCupones;
