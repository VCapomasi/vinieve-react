function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, loading, modoEdicion }) {
  return (
    <form className="formulario-producto" onSubmit={manejarEnvio}>
      <h3>{modoEdicion ? 'Editar producto' : 'Agregar producto'}</h3>

      <label>Nombre</label>
      <input name="nombre" value={datosForm.nombre} onChange={manejarCambio} required />

      <label>Categoría</label>
      <input name="categoria" value={datosForm.categoria} onChange={manejarCambio} required />

      <label>Precio</label>
      <input type="number" name="precio" value={datosForm.precio} onChange={manejarCambio} min="1" required />

      <label>Stock</label>
      <input type="number" name="stock" value={datosForm.stock} onChange={manejarCambio} min="0" required />

      <label>Imagen</label>
      <input name="imagen" value={datosForm.imagen} onChange={manejarCambio} placeholder="/images/producto.jpg" />

      <label>Detalle</label>
      <textarea name="detalle" value={datosForm.detalle} onChange={manejarCambio} required />

      <button className="btn-principal" type="submit" disabled={loading}>
        {loading ? 'Procesando...' : modoEdicion ? 'Actualizar producto' : 'Guardar producto'}
      </button>
    </form>
  );
}

export default FormularioProducto;
