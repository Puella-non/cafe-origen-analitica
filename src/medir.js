const { generarVentas } = require("./generador");
const f = require("./instrumentadas");

for (const n of [100, 1000]) {
  const ventas = generarVentas(n);
  console.log(`--- n = ${n} ---`);
  for (const nombre of ["totalVendido", "totalPorCiudad", "ventaMayor", "primeraVenta"]) {
    const c = { ops: 0 };
    f[nombre](ventas, c);
    console.log(nombre, "→ ops:", c.ops);
  }
}
