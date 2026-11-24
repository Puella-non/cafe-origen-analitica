const { generarVentas } = require("./generador");
const f = require("./instrumentadas");

const funciones = ["totalVendido", "totalPorCiudad", "ventaMayor", "primeraVenta"];
const tamanos = [100, 1000, 10000, 100000];
const filas = [];

for (const n of tamanos) {
  const ventas = generarVentas(n);
  const fila = { n };
  for (const nombre of funciones) {
    const c = { ops: 0 };
    f[nombre](ventas, c);
    fila[nombre] = c.ops;
  }
  filas.push(fila);
}

console.log("Operaciones por función");
console.table(filas);

// Factor de crecimiento: operaciones actuales ÷ operaciones del tamaño anterior
const factores = [];
for (let i = 1; i < filas.length; i++) {
  const fila = { "de n": filas[i - 1].n, "a n": filas[i].n };
  for (const nombre of funciones) {
    fila[nombre] = "× " + filas[i][nombre] / filas[i - 1][nombre];
  }
  factores.push(fila);
}

console.log("Factor de crecimiento al multiplicar n por 10");
console.table(factores);