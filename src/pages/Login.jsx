import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('norberto@vinieve.com');
  const [password, setPassword] = useState('react2026');

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) navigate('/gestion');
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Mi cuenta</h2>
        <form onSubmit={handleLogin} className="form-simple">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn-principal" type="submit">Ingresar</button>
        </form>
        <p className="ayuda-login">Usuario de prueba: norberto@vinieve.com / react2026</p>
        <p>¿No tenés cuenta? <Link to="/registro">Crear cuenta</Link></p>
      </div>
    </section>
  );
}

export default Login;
