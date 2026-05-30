import ItemListContainer from '../components/Productos/ItemListContainer/ItemListContainer';
import FormularioContainer from '../components/FormularioProducto/FormularioContainer';

function Productos() {
  return (
    <div className="productos-page">
      <ItemListContainer mensaje="Catálogo de productos" />
      <FormularioContainer />
    </div>
  );
}

export default Productos;
