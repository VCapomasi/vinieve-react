import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, accion) => {
    setCarrito((actual) =>
      actual.map((item) => {
        if (item.id !== id) return item;
        const cantidad = accion === 'sumar' ? item.cantidad + 1 : Math.max(1, item.cantidad - 1);
        return { ...item, cantidad };
      })
    );
  };

  const vaciarCarrito = () => setCarrito([]);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}
