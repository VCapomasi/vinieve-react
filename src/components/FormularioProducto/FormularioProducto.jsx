function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, loading, modoEdicion, cancelar }) {
  return (
    <form className="admin-form" onSubmit={manejarEnvio}>
      <h3>{modoEdicion ? 'Editar producto' : 'Agregar producto'}</h3>
      <input name="id" value={datosForm.id} onChange={manejarCambio} placeholder="ID" />
      <input name="nombre" value={datosForm.nombre} onChange={manejarCambio} placeholder="Nombre" />
      <input name="categoria" value={datosForm.categoria} onChange={manejarCambio} placeholder="Categoría" />
      <input name="precio" type="number" value={datosForm.precio} onChange={manejarCambio} placeholder="Precio" />
      <input name="stock" type="number" value={datosForm.stock} onChange={manejarCambio} placeholder="Stock" />
      <input name="imagen" value={datosForm.imagen} onChange={manejarCambio} placeholder="Ruta o URL de imagen" />
      <textarea name="detalle" value={datosForm.detalle} onChange={manejarCambio} placeholder="Detalle" />
      <label className="check"><input type="checkbox" name="destacado" checked={Boolean(datosForm.destacado)} onChange={manejarCambio} /> Destacado</label>
      <button className="btn" disabled={loading}>{loading ? 'Procesando...' : modoEdicion ? 'Actualizar producto' : 'Guardar producto'}</button>
      {modoEdicion && <button type="button" className="btn secondary" onClick={cancelar}>Cancelar</button>}
    </form>
  );
}

export default FormularioProducto;
