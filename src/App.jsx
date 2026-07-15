import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Inicio from './pages/Inicio.jsx';
import Productos from './pages/Productos.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import GestionProductos from './pages/GestionProductos.jsx';
import GestionCupones from './pages/GestionCupones.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        <Route element={<ProtectedRoute rolesPermitidos={["admin"]} />}>
          <Route path="gestion" element={<GestionProductos />} />
          <Route path="cupones" element={<GestionCupones />} />
        </Route>

        <Route path="*" element={<Inicio />} />
      </Route>
    </Routes>
  );
}

export default App;
