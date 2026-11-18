const ventas = require("./datos")
const funciones = require("./analitica")

const nombreCiudad = (texto) => {
  const t = normalizar(texto);
  return t[0].toUpperCase() + t.slice(1);   // "medellín " → "Medellín"
};
function totalPorCiudad(ventas) {
  return ventas.reduce((acc, v) => {
    const c = nombreCiudad(v.ciudad);
    acc[c] = (acc[c] || 0) + valorVenta(v);
    return acc;
  }, {});
}

// Los k productos con más valor vendido, de mayor a menor (solo los nombres)
function topProductosPorValor(ventas, k) {
  const porProducto = ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + valorVenta(v);
    return acc;
  }, {});
  return Object.entries(porProducto)   // arreglo nuevo: no toca "ventas"
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([producto]) => producto);
}