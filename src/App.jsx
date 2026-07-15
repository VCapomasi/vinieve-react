import { createContext, useContext, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

const productosIniciales = [
  { id: 1, nombre: 'Campera Térmica Pro', categoria: 'Indumentaria', precio: 249999, stock: 12, imagen: '/images/campera.jpg', detalle: 'Campera impermeable con aislamiento térmico. Ideal para temperaturas extremas y jornadas largas en la nieve.' },
  { id: 2, nombre: 'Campera Mujer Snow', categoria: 'Indumentaria', precio: 229999, stock: 10, imagen: '/images/campera_mujer.jpg', detalle: 'Campera técnica para mujer, liviana, abrigada y resistente al viento.' },
  { id: 3, nombre: 'Chaqueta de Esquí', categoria: 'Indumentaria', precio: 219999, stock: 8, imagen: '/images/chaqueta_esqui.jpg', detalle: 'Chaqueta diseñada para esquí y snowboard, con tejido impermeable y respirable.' },
  { id: 4, nombre: 'Pantalón Nieve', categoria: 'Indumentaria', precio: 159999, stock: 15, imagen: '/images/pantalon.jpg', detalle: 'Pantalón impermeable con ajuste cómodo para actividades de montaña.' },
  { id: 5, nombre: 'Pantalón Niña Snow', categoria: 'Indumentaria', precio: 129999, stock: 9, imagen: '/images/pantalon_nina.jpg', detalle: 'Pantalón infantil para nieve, cómodo, térmico y resistente.' },
  { id: 6, nombre: 'Gafas Antivaho', categoria: 'Accesorios', precio: 89999, stock: 20, imagen: '/images/gafas.jpg', detalle: 'Gafas con protección UV y sistema antivaho para mejor visibilidad.' },
  { id: 7, nombre: 'Casco Alpine', categoria: 'Seguridad', precio: 119999, stock: 7, imagen: '/images/casco_alpine.png', detalle: 'Casco liviano y resistente para esquí, snowboard y deportes de nieve.' },
  { id: 8, nombre: 'Mochila Técnica', categoria: 'Accesorios', precio: 99999, stock: 11, imagen: '/images/mochila.JPG', detalle: 'Mochila compacta para montaña, con espacio para accesorios y abrigo.' },
  { id: 9, nombre: 'Overol con Capucha', categoria: 'Indumentaria', precio: 269999, stock: 6, imagen: '/images/overol_capucha.jpg', detalle: 'Overol térmico con capucha para máxima protección en días de nieve.' },
  { id: 10, nombre: 'Overol Snow', categoria: 'Indumentaria', precio: 259999, stock: 5, imagen: '/images/overol_snow.jpg', detalle: 'Overol impermeable para nieve, pensado para abrigo, movilidad y comodidad.' },
];

const equipo = [
  { id: 1, nombre: 'Ana Torres', puesto: 'Dirección e-commerce', imagen: '/images/equipo-ana.jpg' },
  { id: 2, nombre: 'Martina López', puesto: 'Atención al cliente', imagen: '/images/equipo-martina.jpg' },
  { id: 3, nombre: 'Julián Ríos', puesto: 'Logística y envíos', imagen: '/images/equipo-julian.jpg' },
];

const CartContext = createContext();
const AuthContext = createContext();

function useCart() {
  return useContext(CartContext);
}

function useAuth() {
  return useContext(AuthContext);
}

function formatoPrecio(numero) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(numero);
}

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, accion) => {
    setCarrito((actual) => actual.map((item) => {
      if (item.id !== id) return item;
      const nuevaCantidad = accion === 'sumar' ? item.cantidad + 1 : Math.max(1, item.cantidad - 1);
      return { ...item, cantidad: nuevaCantidad };
    }));
  };

  const vaciarCarrito = () => setCarrito([]);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = (email, password) => {
    if (email === 'norberto@vinieve.com' && password === 'react2026') {
      setUsuario({ nombre: 'Norberto', email, rol: 'admin', imagen: '/images/icon_user.png' });
      return true;
    }
    alert('Usuario o contraseña incorrectos. Probá con norberto@vinieve.com / react2026');
    return false;
  };

  const registro = (email, password) => {
    if (!email || password.length < 6) {
      alert('Ingresá un email y una contraseña de al menos 6 caracteres.');
      return false;
    }
    setUsuario({ nombre: 'Usuario', email, rol: 'user', imagen: '/images/icon_user.png' });
    return true;
  };

  const logout = () => setUsuario(null);

  return <AuthContext.Provider value={{ usuario, login, registro, logout }}>{children}</AuthContext.Provider>;
}

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/gestion" element={<RutaPrivada><GestionProductos /></RutaPrivada>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  const { totalItems } = useCart();
  const { usuario, logout } = useAuth();
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="Logo Vinieve" />
          <h1>Vinieve</h1>
        </Link>
      </header>

      <nav className="nav">
        <div className="nav-centro">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
        </div>
        <div className="nav-derecha">
          <Link to="/carrito" className="icon-link" aria-label="Carrito">🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link>
          <button className="btn-cuenta" onClick={() => setModalAbierto(true)}>👤 Mi cuenta</button>
          {usuario && <button className="btn-salir" onClick={logout}>Salir</button>}
        </div>
      </nav>

      {modalAbierto && <ModalCuenta cerrar={() => setModalAbierto(false)} />}
    </>
  );
}

function ModalCuenta({ cerrar }) {
  const { usuario, login, registro } = useAuth();
  const navigate = useNavigate();
  const [modo, setModo] = useState('login');
  const [email, setEmail] = useState('norberto@vinieve.com');
  const [password, setPassword] = useState('react2026');

  const enviar = (e) => {
    e.preventDefault();
    const ok = modo === 'login' ? login(email, password) : registro(email, password);
    if (ok) cerrar();
  };

  return (
    <div className="modal-fondo">
      <div className="modal-cuenta">
        <button className="cerrar-modal" onClick={cerrar}>×</button>
        {usuario ? (
          <>
            <h2>Mi cuenta</h2>
            <img src={usuario.imagen} alt="Usuario" className="perfil-img" />
            <p><strong>{usuario.nombre}</strong></p>
            <p>{usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
            {usuario.rol === 'admin' && <button className="btn-principal" onClick={() => { cerrar(); navigate('/gestion'); }}>Ir a gestión</button>}
          </>
        ) : (
          <>
            <h2>{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
            <form onSubmit={enviar} className="form-simple">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn-principal" type="submit">{modo === 'login' ? 'Ingresar' : 'Registrarme'}</button>
            </form>
            <button className="link-modal" onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}>
              {modo === 'login' ? 'Crear una cuenta' : 'Ya tengo cuenta'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <h2>Equipamiento para disfrutar la nieve</h2>
          <p>Indumentaria y accesorios para esquí, snowboard y montaña.</p>
          <Link to="/productos" className="btn-principal">Ver productos</Link>
        </div>
      </section>
      <section className="seccion">
        <h2>Productos destacados</h2>
        <ProductGrid productos={productosIniciales.slice(0, 3)} />
      </section>
    </>
  );
}

function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const filtrados = productosIniciales.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <section className="productos-section">
      <h2>Productos</h2>
      <input className="buscador" placeholder="Buscar producto..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      <ProductGrid productos={filtrados} />
    </section>
  );
}

function ProductGrid({ productos }) {
  return <div className="productos-grid">{productos.map((producto) => <Item key={producto.id} producto={producto} />)}</div>;
}

function Item({ producto }) {
  return (
    <article className="producto-card">
      <div className="producto-imagen"><img src={producto.imagen} alt={producto.nombre} /></div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.detalle}</p>
        <p className="stock">Stock disponible: {producto.stock}</p>
        <p className="producto-precio">{formatoPrecio(producto.precio)}</p>
        <Link to={`/producto/${producto.id}`} className="btn-comprar">Ver detalle</Link>
      </div>
    </article>
  );
}

function DetalleProducto() {
  const { id } = useParams();
  const producto = productosIniciales.find((item) => item.id === Number(id));
  const { agregarAlCarrito } = useCart();

  if (!producto) return <section className="seccion"><h2>Producto no encontrado</h2></section>;

  return (
    <section className="detalle">
      <img src={producto.imagen} alt={producto.nombre} />
      <div>
        <h2>{producto.nombre}</h2>
        <p>{producto.detalle}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>
        <p className="producto-precio">{formatoPrecio(producto.precio)}</p>
        <button className="btn-principal" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
      </div>
    </section>
  );
}

function Carrito() {
  const { carrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito, subtotal } = useCart();
  const [cupon, setCupon] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  const aplicarCupon = () => {
    const codigo = cupon.trim().toUpperCase();
    if (codigo === 'VINIEVE10') setDescuento(10);
    else if (codigo === 'NIEVE20') setDescuento(20);
    else alert('Cupón no válido. Probá VINIEVE10 o NIEVE20.');
  };

  const total = subtotal - (subtotal * descuento / 100);

  if (compraFinalizada) {
    return (
      <section className="confirmacion">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido fue procesado correctamente. Te esperamos para seguir equipándote para la nieve.</p>
        <Link to="/productos" className="btn-principal">Seguir comprando</Link>
      </section>
    );
  }

  return (
    <section className="carrito">
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? <p>Tu carrito está vacío.</p> : (
        <div className="carrito-layout">
          <div>
            {carrito.map((item) => (
              <div className="carrito-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <div><h3>{item.nombre}</h3><p>{formatoPrecio(item.precio)}</p></div>
                <div className="cantidad"><button onClick={() => cambiarCantidad(item.id, 'restar')}>-</button><span>{item.cantidad}</span><button onClick={() => cambiarCantidad(item.id, 'sumar')}>+</button></div>
                <button className="btn-eliminar" onClick={() => quitarDelCarrito(item.id)}>Eliminar</button>
              </div>
            ))}
          </div>
          <aside className="resumen">
            <h3>Resumen</h3>
            <input placeholder="Cupón" value={cupon} onChange={(e) => setCupon(e.target.value)} />
            <button onClick={aplicarCupon}>Aplicar</button>
            <p>Subtotal: {formatoPrecio(subtotal)}</p>
            {descuento > 0 && <p>Descuento: {descuento}%</p>}
            <h3>Total: {formatoPrecio(total)}</h3>
            <button className="btn-principal" onClick={() => { vaciarCarrito(); setCompraFinalizada(true); }}>Proceder al pago</button>
            <button className="btn-secundario" onClick={vaciarCarrito}>Vaciar carrito</button>
          </aside>
        </div>
      )}
    </section>
  );
}

function Nosotros() {
  return (
    <section className="nosotros">
      <h2>Nosotros</h2>
      <p>
        Vinieve es la primer tienda online especializada en productos para esquí y deportes de nieve.
        Da sus primeros pasos ofreciendo chaquetas térmicas, pantalones impermeables, guantes y accesorios de alta calidad.
        Nuestra pasión por la montaña nos impulsan a equipar a cada aventurero para que conquiste las cumbres nevadas con seguridad, comodidad y estilo.
      </p>
      <h3>Equipo ViNieve</h3>
      <div className="equipo-grid">
        {equipo.map((persona) => (
          <article className="equipo-card" key={persona.id}>
            <img src={persona.imagen} alt={persona.nombre} />
            <h4>{persona.nombre}</h4>
            <p>{persona.puesto}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RutaPrivada({ children }) {
  const { usuario } = useAuth();
  if (!usuario || usuario.rol !== 'admin') return <Navigate to="/" />;
  return children;
}

function GestionProductos() {
  const [productos, setProductos] = useState(productosIniciales);
  const estadoInicial = { id: '', nombre: '', categoria: '', precio: '', stock: '', detalle: '', imagen: '' };
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({ ...datosForm, [name]: value });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!datosForm.nombre || Number(datosForm.precio) <= 0) {
      alert('Completá nombre y precio mayor a cero.');
      return;
    }

    if (productoAEditar) {
      setProductos(productos.map((item) => item.id === productoAEditar.id ? { ...datosForm, id: productoAEditar.id, precio: Number(datosForm.precio), stock: Number(datosForm.stock) } : item));
    } else {
      const nuevoProducto = { ...datosForm, id: Date.now(), precio: Number(datosForm.precio), stock: Number(datosForm.stock), imagen: datosForm.imagen || '/images/logo.png' };
      setProductos([...productos, nuevoProducto]);
    }

    setProductoAEditar(null);
    setDatosForm(estadoInicial);
  };

  const editarProducto = (producto) => {
    setProductoAEditar(producto);
    setDatosForm(producto);
  };

  return (
    <section className="gestion">
      <h2>Gestión de productos</h2>
      <p>Panel simple para agregar o editar productos. Los productos no se eliminan desde esta vista.</p>
      <form className="form-gestion" onSubmit={manejarEnvio}>
        <input name="nombre" placeholder="Nombre" value={datosForm.nombre} onChange={manejarCambio} />
        <input name="categoria" placeholder="Categoría" value={datosForm.categoria} onChange={manejarCambio} />
        <input name="precio" type="number" placeholder="Precio" value={datosForm.precio} onChange={manejarCambio} />
        <input name="stock" type="number" placeholder="Stock" value={datosForm.stock} onChange={manejarCambio} />
        <input name="imagen" placeholder="Ruta de imagen /images/..." value={datosForm.imagen} onChange={manejarCambio} />
        <textarea name="detalle" placeholder="Detalle" value={datosForm.detalle} onChange={manejarCambio} />
        <button className="btn-principal" type="submit">{productoAEditar ? 'Actualizar producto' : 'Guardar producto'}</button>
      </form>

      <div className="lista-gestion">
        {productos.map((producto) => (
          <div key={producto.id}>
            <span>{producto.nombre} - {formatoPrecio(producto.precio)}</span>
            <button onClick={() => editarProducto(producto)}>Editar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
        </div>
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Logo Vinieve" />
          <h2>Vinieve</h2>
        </div>
        <div className="footer-contacto">
          <p>Email: info@vinieve.com</p>
          <p>Tel: +34 011 4123 5456</p>
          <p>Horario: Lun-Vie 9:00-18:00</p>
        </div>
      </div>
      <p className="credito">Desarrollado por <a href="https://www.instagram.com/pypyana" target="_blank" rel="noreferrer">@pypyana</a></p>
      <p className="copy">© 2026 Vinieve. Todos los derechos reservados.</p>
    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </AuthProvider>
  );
}
