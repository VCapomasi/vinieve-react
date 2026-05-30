import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

function Item({ id, nombre, precio, descripcion, imagen, stock }) {
  const [favorito, setFavorito] = useState(false);

  const alternarFavorito = () => {
    setFavorito(!favorito);
  };

  return (
    <div className="producto-card">
      <Link to={`/producto/${id}`} className="producto-link">
        <div className="producto-imagen">
          <img src={imagen} alt={nombre} />
        </div>
      </Link>

      <div className="producto-info">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="stock">Stock disponible: {stock}</p>
        <div className="producto-precio">${precio.toLocaleString('es-AR')}</div>

        <div className="acciones-producto">
          <Link to={`/producto/${id}`} className="btn-comprar">Ver detalle</Link>
          <button className="btn-favorito" onClick={alternarFavorito}>
            {favorito ? '⭐' : '☆'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
