const ventas = require("./datos");
const f = require("./analitica");

// ---- Reconstrucción de la versión preliminar (con los errores) ----
function totalPorCiudadPreliminar(datos) {
  return datos.reduce((acc, v) => {
    acc[v.ciudad] = (acc[v.ciudad] || 0) + v.cantidad * v.precio; // sin normalizar
    return acc;
  }, {});
}

function ticketPromedioPreliminar(datos) {
  let total = 0;
  for (const v of datos) total += v.cantidad * v.precio;
  return total / datos.length; // sin guarda: con [] hace 0 / 0
}

// ---- Error 1: ciudad duplicada ----
console.log("=== ERROR 1: ciudad duplicada ===");

const bogota = [
  { id: 100, fecha: "2026-09-07", cliente: "C09", producto: "Prensa francesa", ciudad: "Bogotá",  cantidad: 1, precio: 95000 },
  { id: 101, fecha: "2026-09-07", cliente: "C10", producto: "Prensa francesa", ciudad: "Bogotá ", cantidad: 1, precio: 95000 },
];

console.log("Preliminar, entrada mínima:", totalPorCiudadPreliminar(bogota));
console.log("Longitud de cada clave:", Object.keys(totalPorCiudadPreliminar(bogota)).map(k => k.length));
console.log("Preliminar, datos.js:", Object.keys(totalPorCiudadPreliminar(ventas)));
console.log("Actual, entrada mínima:", f.totalPorCiudad(bogota));
console.log("Actual, datos.js:", Object.keys(f.totalPorCiudad(ventas)));

// ---- Error 2: NaN en un día sin ventas ----
console.log("\n=== ERROR 2: ticket promedio NaN ===");

const sinVentas = f.ventasDelDia(ventas, "2026-09-07");
console.log("Ventas del 2026-09-07:", sinVentas);
console.log("Preliminar:", ticketPromedioPreliminar(sinVentas));
console.log("Actual:", f.ticketPromedio(sinVentas));
console.log("¿Actual es NaN?", Number.isNaN(f.ticketPromedio(sinVentas)));