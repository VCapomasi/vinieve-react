import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function Header() {
  const { cantidadTotal } = useCart();
  const { user, logout } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);
  const nombreSesion = user?.nombre || user?.email;

  return (
    <>
      <header className="header">
        <Link to="/" className="logo" onClick={cerrarMenu}><img src="/images/logo.png" alt="Vinieve" /><h1>Vinieve</h1></Link>
      </header>
      <nav className="nav">
        <button type="button" className="hamburger" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir o cerrar menú" aria-expanded={menuAbierto}>
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`nav-links ${menuAbierto ? 'active' : ''}`}>
          <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
          <li><Link to="/productos" onClick={cerrarMenu}>Productos</Link></li>
          <li><Link to="/nosotros" onClick={cerrarMenu}>Nosotros</Link></li>
          <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
        </ul>
        <div className="nav-actions">
          {user && <span className="saludo-sesion">Hola, {nombreSesion}</span>}
          <Link to="/carrito" className="icon-btn" onClick={cerrarMenu}><FaShoppingCart />{cantidadTotal > 0 && <span>{cantidadTotal}</span>}</Link>
          <button className={`icon-btn cuenta-btn ${user ? 'logueado' : ''}`} onClick={() => { setAbierto(true); cerrarMenu(); }}>
            <FaUser /> {user ? 'Cuenta' : 'Mi cuenta'}
          </button>
        </div>
      </nav>
      {abierto && <CuentaModal user={user} logout={logout} cerrar={() => setAbierto(false)} />}
    </>
  );
}

function CuentaModal({ user, logout, cerrar }) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      await login(email, password);
      cerrar();
    } catch (error) {
      setMensaje('Error: ' + error.message);
    }
  };

  const handleRegistro = async () => {
    setMensaje('');
    const emailLimpio = email.trim();
    if (!emailLimpio || !password) {
      setMensaje('Error: completá email y contraseña para crear la cuenta.');
      return;
    }
    if (password.length < 6) {
      setMensaje('Error: la contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {
      const credencial = await signup(emailLimpio, password);
      await setDoc(doc(db, 'usuarios', credencial.user.uid), {
        nombre: emailLimpio.split('@')[0],
        email: emailLimpio,
        rol: 'user'
      }, { merge: true });
      setMensaje('Cuenta creada correctamente. Ya podés iniciar sesión.');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') setMensaje('Ese email ya está registrado. Probá iniciar sesión.');
      else if (error.code === 'auth/invalid-email') setMensaje('Error: escribí un email válido.');
      else if (error.code === 'auth/weak-password') setMensaje('Error: la contraseña debe tener al menos 6 caracteres.');
      else setMensaje('Error: ' + error.message);
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <button className="modal-x" onClick={cerrar}>×</button>
        <h2>Mi cuenta</h2>
        {user ? (
          <div className="cuenta">
            <img src="/images/icon_user.png" alt="Usuario" />
            <p><strong>{user.nombre}</strong></p>
            <p>{user.email}</p>
            <p>Rol: {user.rol}</p>
            {user.rol === 'admin' && <>
              <button className="btn" onClick={() => { cerrar(); navigate('/gestion'); }}>Gestión productos</button>
              <button className="btn secondary" onClick={() => { cerrar(); navigate('/cupones'); }}>Gestión cupones</button>
            </>}
            <button className="btn secondary" onClick={() => { logout(); cerrar(); }}>Cerrar sesión</button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
            <button className="btn">Iniciar sesión</button>
            <button type="button" className="btn secondary" onClick={handleRegistro}>Crear cuenta</button>
            {mensaje && <small>{mensaje}</small>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Header;
