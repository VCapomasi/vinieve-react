import { Link } from 'react-router-dom';
import ItemListContainer from '../components/Productos/ItemListContainer/ItemListContainer';

function Home() {
  return (
    <>


      <ItemListContainer mensaje="Productos destacados" />

      </>
  );
}

export default Home;
