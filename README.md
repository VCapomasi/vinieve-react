# Vinieve - Proyecto final React

Vinieve es una tienda online especializada en productos para disfrutar la nieve con comodidad, abrigo y seguridad. Nuestra propuesta combina catálogo técnico, estética limpia y experiencia de compra simple.

Este proyecto final integra React, React Router, Context API, carrito, autenticación, gestión de productos, cupones, búsqueda y diseño responsivo.

## Funcionalidades

- Catálogo con 10 productos.
- Vista de detalle con ruta dinámica `/producto/:id`.
- Carrito con Context API.
- Agregar productos al carrito, modificar cantidad, eliminar del carrito y vaciar carrito.
- Cupones de descuento aplicables al carrito.
- Autenticación de usuarios con Firebase Authentication.
- Usuario de prueba con acceso a gestión.
- Asignación de rol admin mediante Firestore.
- Indicador visual de sesión iniciada con saludo al usuario.
- Gestión de productos con persistencia en Firestore:
  - crear producto
  - editar producto
  - eliminar producto
- Gestión de cupones con persistencia en Firestore:
  - crear cupón
  - editar cupón
  - eliminar cupón
- Buscador de productos.
- Página Nosotros con equipo.
- Página Contacto.
- Menú hamburguesa responsive para dispositivos móviles.
- Diseño responsive adaptado a escritorio, tablet y celular.

## Usuario de prueba

Email: `norberto@vinieve.com`  
Contraseña: `react2026`

## Cupones disponibles

- `VINIEVE10` — 10% de descuento.
- `NIEVE20` — 20% de descuento.

## Tecnologías

- React
- Vite
- React Router DOM
- Context API
- Firebase Authentication
- Firebase Firestore
- CSS responsive

## Estructura general del proyecto

src/
├── components/
├── context/
├── firebase/
├── pages/
├── data/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
