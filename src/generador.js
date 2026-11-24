const azar = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const PRODUCTOS = [
  { producto: "Origen Huila 500 g", precio: 42000 },
  { producto: "Origen Nariño 250 g", precio: 26000 },
  { producto: "Origen Sierra 500 g", precio: 45000 },
  { producto: "Prensa francesa", precio: 95000 },
  { producto: "Molino manual", precio: 120000 }
];

const CIUDADES = ["Medellín", "Bogotá", "Cali", "Pereira"];

function generarVentas(n) {
  const clientes = Math.max(1, Math.floor(n / 3));
  const ventas = [];
  for (let i = 1; i <= n; i++) {
    const p = PRODUCTOS[azar(0, PRODUCTOS.length - 1)];   // Math.random al azar
    ventas.push({
      id: i, fecha: "2026-09-" + String(azar(1, 30)).padStart(2, "0"),
      cliente: "C" + String(azar(1, clientes)).padStart(2, "0"),
      producto: p.producto, ciudad: CIUDADES[azar(0, CIUDADES.length - 1)],
      cantidad: azar(1, 5), precio: p.precio
    });
  }
  return ventas;
}

module.exports = { generarVentas };


