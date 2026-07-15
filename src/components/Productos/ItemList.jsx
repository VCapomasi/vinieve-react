import Item from './Item.jsx';

function ItemList({ productos }) {
  if (productos.length === 0) return <p className="estado-carga">No se encontraron productos.</p>;

  return (
    <div className="productos-grid">
      {productos.map((producto) => <Item key={producto.id} producto={producto} />)}
    </div>
  );
}

export default ItemList;
