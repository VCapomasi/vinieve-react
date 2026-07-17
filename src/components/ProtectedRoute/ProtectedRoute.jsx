import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function ProtectedRoute({ rolesPermitidos }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="estado">Cargando...</p>;
  if (!user) return <Navigate to="/" replace />;
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
