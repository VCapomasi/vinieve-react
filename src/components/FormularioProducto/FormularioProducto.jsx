import './FormularioProducto.css';

function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {
  return (
    <section className="contacto-section">
      <h2>Contacto</h2>
      <p>¿Necesitás asesoramiento sobre qué equipo elegir? Escribinos.</p>

      <form className="formulario-contacto" onSubmit={manejarEnvio}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={datosForm.nombre}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="tucorreo@email.com"
            value={datosForm.email}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="form-group">
          <label>Producto de interés</label>
          <input
            type="text"
            name="producto"
            placeholder="Ej: Campera Térmica Pro"
            value={datosForm.producto}
            onChange={manejarCambio}
          />
        </div>

        <div className="form-group">
          <label>Mensaje</label>
          <textarea
            name="mensaje"
            placeholder="Tu mensaje..."
            value={datosForm.mensaje}
            onChange={manejarCambio}
            required
          />
        </div>

        <button type="submit" className="btn-enviar">Enviar consulta</button>
      </form>
    </section>
  );
}

export default FormularioProducto;
