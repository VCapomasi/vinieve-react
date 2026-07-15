import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Registro() {
  const { registro } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = registro(email, password);
    if (ok) navigate('/');
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="form-simple">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" />
          <button className="btn-principal" type="submit">Registrarme</button>
        </form>
      </div>
    </section>
  );
}

export default Registro;
