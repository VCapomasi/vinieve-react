import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Productos from './pages/Productos.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import GestionProductos from './pages/GestionProductos.jsx';
import GestionCupones from './pages/GestionCupones.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route element={<ProtectedRoute rolesPermitidos={["admin"]} />}>
          <Route path="gestion" element={<GestionProductos />} />
          <Route path="cupones" element={<GestionCupones />} />
        </Route>
        <Route path="*" element={<p className="estado">Página no encontrada.</p>} />
      </Route>
    </Routes>
  );
}

export default App;
