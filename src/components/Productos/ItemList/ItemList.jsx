import Item from '../Item/Item';
import './ItemList.css';

function ItemList({ productos }) {
  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <Item key={producto.id} {...producto} />
      ))}
    </div>
  );
}

export default ItemList;
