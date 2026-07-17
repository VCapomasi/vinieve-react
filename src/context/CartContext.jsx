import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.docId === producto.docId);
      if (existe) {
        return actual.map((item) => item.docId === producto.docId ? { ...item, cantidad: item.cantidad + cantidad } : item);
      }
      return [...actual, { ...producto, cantidad }];
    });
  };

  const cambiarCantidad = (docId, cantidad) => {
    if (cantidad <= 0) return eliminarDelCarrito(docId);
    setCarrito((actual) => actual.map((item) => item.docId === docId ? { ...item, cantidad } : item));
  };

  const eliminarDelCarrito = (docId) => setCarrito((actual) => actual.filter((item) => item.docId !== docId));
  const vaciarCarrito = () => setCarrito([]);
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, cantidadTotal, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}
