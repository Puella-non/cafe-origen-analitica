const { valorVentas, normalizar, nombreCiudad } = require("./analitica");

function totalVendido(venta, c) {
    let total = 0;
    for (const v of venta) {
        c.ops++; total += valorVentas(v);
    }
    return total;
}

function totalPorCiudad(ventas, c) {
  const resultado = {};
  for (const v of ventas) {
    c.ops++;
    const ciudad = nombreCiudad(v.ciudad);
    resultado[ciudad] = (resultado[ciudad] || 0) + valorVentas(v);
  }
  return resultado;
}

function ventaMayor(ventas, c) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const v of ventas) {
    c.ops++;
    if (valorVentas(v) > valorVentas(mayor)) mayor = v;
  }
  return mayor;
}

function primeraVenta(ventas, c) {
  c.ops++;
  return ventas.length === 0 ? null : ventas[0];
}

function clientesRecurrentes(ventas, c) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      c.ops++;
      if (ventas[i].cliente === ventas[j].cliente &&
          !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}

module.exports = { totalVendido, totalPorCiudad, ventaMayor, primeraVenta, clientesRecurrentes };