import { useState } from 'react';
import FormularioProducto from '../components/FormularioProducto/FormularioProducto.jsx';
import { useData } from '../context/DataContext.jsx';
import { formatearPrecio } from '../utils/formatearPrecio.js';

function GestionProductos() {
  const { productos, guardarProducto, eliminarProducto } = useData();
  const estadoInicial = { id: '', nombre: '', categoria: '', precio: '', stock: '', detalle: '', imagen: '', destacado: false };
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const modoEdicion = productoAEditar !== null;

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosForm({ ...datosForm, [name]: type === 'checkbox' ? checked : value });
  };

  const manejarEditar = (producto) => {
    setProductoAEditar(producto);
    setDatosForm(producto);
  };

  const cancelar = () => {
    setProductoAEditar(null);
    setDatosForm(estadoInicial);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!datosForm.nombre || Number(datosForm.precio) <= 0) return alert('Nombre obligatorio y precio mayor a 0.');
    setLoading(true);
    await guardarProducto(datosForm);
    setLoading(false);
    cancelar();
  };

  return (
    <section className="section admin">
      <h2>Gestión de productos</h2>
      <FormularioProducto datosForm={datosForm} manejarCambio={manejarCambio} manejarEnvio={manejarEnvio} loading={loading} modoEdicion={modoEdicion} cancelar={cancelar} />
      <h3>Productos actuales</h3>
      <div className="admin-list">{productos.map((producto) => <div key={producto.docId}><strong>{producto.nombre}</strong><span>{formatearPrecio(producto.precio)}</span><button onClick={() => manejarEditar(producto)}>Editar</button><button onClick={() => eliminarProducto(producto.docId)}>Eliminar</button></div>)}</div>
    </section>
  );
}

export default GestionProductos;
