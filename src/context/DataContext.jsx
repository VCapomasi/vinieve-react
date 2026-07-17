import { createContext, useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { productosIniciales } from '../data/productosIniciales.js';
import { cuponesIniciales } from '../data/cuponesIniciales.js';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarProductos = async () => {
    const productosRef = collection(db, 'productos');
    const resp = await getDocs(query(productosRef, orderBy('id')));
    let lista = resp.docs.map((documento) => ({ docId: documento.id, ...documento.data() }));
    if (lista.length === 0) {
      await Promise.all(productosIniciales.map((producto) => addDoc(productosRef, producto)));
      const nuevaResp = await getDocs(query(productosRef, orderBy('id')));
      lista = nuevaResp.docs.map((documento) => ({ docId: documento.id, ...documento.data() }));
    }
    setProductos(lista);
  };

  const cargarCupones = async () => {
    const cuponesRef = collection(db, 'cupones');
    const resp = await getDocs(cuponesRef);
    let lista = resp.docs.map((documento) => ({ docId: documento.id, ...documento.data() }));
    if (lista.length === 0) {
      await Promise.all(cuponesIniciales.map((cupon) => addDoc(cuponesRef, cupon)));
      const nuevaResp = await getDocs(cuponesRef);
      lista = nuevaResp.docs.map((documento) => ({ docId: documento.id, ...documento.data() }));
    }
    setCupones(lista);
  };

  const recargarDatos = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([cargarProductos(), cargarCupones()]);
    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con Firebase. Revisá Authentication, Firestore, reglas y configuración de Firebase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { recargarDatos(); }, []);

  const guardarProducto = async (producto) => {
    const datos = {
      id: Number(producto.id) || Date.now(),
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      detalle: producto.detalle,
      imagen: producto.imagen,
      destacado: Boolean(producto.destacado)
    };
    if (producto.docId) await updateDoc(doc(db, 'productos', producto.docId), datos);
    else await addDoc(collection(db, 'productos'), datos);
    await recargarDatos();
  };

  const eliminarProducto = async (docId) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await deleteDoc(doc(db, 'productos', docId));
    await recargarDatos();
  };

  const guardarCupon = async (cupon) => {
    const datos = { codigo: cupon.codigo.toUpperCase(), descuento: Number(cupon.descuento) };
    if (cupon.docId) await updateDoc(doc(db, 'cupones', cupon.docId), datos);
    else await addDoc(collection(db, 'cupones'), datos);
    await recargarDatos();
  };

  const eliminarCupon = async (docId) => {
    if (!window.confirm('¿Eliminar este cupón?')) return;
    await deleteDoc(doc(db, 'cupones', docId));
    await recargarDatos();
  };

  return (
    <DataContext.Provider value={{ productos, cupones, loading, error, guardarProducto, eliminarProducto, guardarCupon, eliminarCupon, recargarDatos }}>
      {children}
    </DataContext.Provider>
  );
}
