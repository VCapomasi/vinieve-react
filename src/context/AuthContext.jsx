import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
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

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
