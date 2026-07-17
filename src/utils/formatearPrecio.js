export const formatearPrecio = (valor) => `$${Number(valor || 0).toLocaleString('es-AR')}`;
