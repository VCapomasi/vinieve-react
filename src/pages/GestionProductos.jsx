import { useState } from 'react';
import FormularioProducto from '../components/FormularioProducto/FormularioProducto.jsx';
import { productosIniciales } from '../data/productos.js';
import { formatoPrecio } from '../utils/formatoPrecio.js';

const estadoInicialForm = {
  id: '',
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  imagen: '',
  detalle: ''
};

function GestionProductos() {
  const [productos, setProductos] = useState(productosIniciales);
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [loading, setLoading] = useState(false);

  const modoEdicion = productoAEditar !== null;

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: value
    });
  };

  const manejarEditar = (producto) => {
    setProductoAEditar(producto);
    setDatosForm(producto);
  };

  const cancelarEdicion = () => {
    setProductoAEditar(null);
    setDatosForm(estadoInicialForm);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!datosForm.nombre || Number(datosForm.precio) <= 0) {
      alert('El nombre es obligatorio y el precio debe ser mayor a 0.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const productoCompleto = {
        ...datosForm,
        id: modoEdicion ? productoAEditar.id : Date.now(),
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        imagen: datosForm.imagen || '/images/campera.jpg'
      };

      if (modoEdicion) {
        setProductos((actuales) => actuales.map((producto) => producto.id === productoAEditar.id ? productoCompleto : producto));
      } else {
        setProductos((actuales) => [...actuales, productoCompleto]);
      }

      setDatosForm(estadoInicialForm);
      setProductoAEditar(null);
      setLoading(false);
    }, 500);
  };

  return (
    <section className="gestion">
      <h2>Gestión de productos</h2>
      <p className="gestion-ayuda">Panel protegido para agregar y editar productos. Los productos no se eliminan desde esta vista.</p>

      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        loading={loading}
        modoEdicion={modoEdicion}
      />

      {modoEdicion && <button className="btn-secundario boton-cancelar" onClick={cancelarEdicion}>Cancelar edición</button>}

      <div className="tabla-gestion">
        {productos.map((producto) => (
          <article key={producto.id} className="fila-gestion">
            <img src={producto.imagen} alt={producto.nombre} />
            <div>
              <h3>{producto.nombre}</h3>
              <p>{producto.categoria} — {formatoPrecio(producto.precio)} — Stock: {producto.stock}</p>
            </div>
            <button className="btn-principal" onClick={() => manejarEditar(producto)}>Editar</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GestionProductos;
