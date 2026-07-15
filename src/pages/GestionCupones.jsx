import { useState } from 'react';
import { cuponesIniciales } from '../data/productos.js';

const estadoInicial = {
  codigo: '',
  descuento: ''
};

function GestionCupones() {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [cupones, setCupones] = useState(cuponesIniciales);
  const [cuponAEditar, setCuponAEditar] = useState(null);

  const manejarCambio = (e) => {
    setDatosForm({
      ...datosForm,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!datosForm.codigo || !datosForm.descuento) {
      alert('Complete todos los campos.');
      return;
    }

    const porcentaje = Number(datosForm.descuento);
    if (porcentaje < 1 || porcentaje > 100) {
      alert('El descuento debe estar entre 1 y 100.');
      return;
    }

    if (cuponAEditar) {
      setCupones((actuales) => actuales.map((cupon) => cupon.id === cuponAEditar.id ? { ...cupon, codigo: datosForm.codigo.toUpperCase(), descuento: porcentaje } : cupon));
    } else {
      setCupones((actuales) => [...actuales, { id: Date.now(), codigo: datosForm.codigo.toUpperCase(), descuento: porcentaje }]);
    }

    setDatosForm(estadoInicial);
    setCuponAEditar(null);
  };

  const editarCupon = (cupon) => {
    setCuponAEditar(cupon);
    setDatosForm({ codigo: cupon.codigo, descuento: cupon.descuento });
  };

  const eliminarCupon = (id) => {
    const confirmacion = window.confirm('¿Querés eliminar este cupón?');
    if (!confirmacion) return;
    setCupones((actuales) => actuales.filter((cupon) => cupon.id !== id));
  };

  return (
    <section className="gestion">
      <h2>Gestión de cupones</h2>

      <form className="formulario-producto" onSubmit={manejarEnvio}>
        <h3>{cuponAEditar ? 'Editar cupón' : 'Crear cupón'}</h3>
        <label>Código</label>
        <input name="codigo" value={datosForm.codigo} onChange={manejarCambio} placeholder="VINIEVE10" />
        <label>Descuento</label>
        <input type="number" name="descuento" value={datosForm.descuento} onChange={manejarCambio} placeholder="10" />
        <button className="btn-principal" type="submit">{cuponAEditar ? 'Actualizar cupón' : 'Crear cupón'}</button>
      </form>

      <div className="tabla-gestion cupones-lista">
        {cupones.map((cupon) => (
          <article key={cupon.id} className="fila-gestion">
            <div>
              <h3>{cupon.codigo}</h3>
              <p>{cupon.descuento}% de descuento</p>
            </div>
            <button className="btn-principal" onClick={() => editarCupon(cupon)}>Editar</button>
            <button className="btn-eliminar" onClick={() => eliminarCupon(cupon.id)}>Eliminar</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GestionCupones;
