const ventas = require("./datos");

const valorVentas = (venta) => venta.cantidad * venta.precio;
const normalizar = (texto) => texto.trim().toLowerCase();

function totalVendido(ventas) {
    let total = 0;
    for (const v of ventas) total += valorVentas(v);
    return total;
}

function totalVendidoM(ventas) {
   return ventas
   .reduce((acum, v) => acum + valorVentas(v), 0);
}

// Devuelve el registro completo, no solo el valor
function ventaMayor (ventas) {
    if (ventas.length === 0) return null; // decisión documentada en la bitácora.
    let mayor = ventas[0];
    for (const v of ventas) {
        if (valorVentas(v) > valorVentas(mayor)) mayor = v;
    }
    return mayor;
}

// Ignora mayúsculas y espacios sobrantes
function ventasPorCiudad (ventas, ciudad) {
    let total = 0;
    for (const v of ventas) {
        if (normalizar(v.ciudad) === normalizar(ciudad)) total += valorVentas(v);
    }
    return total;
}

function ventasPorCiudadM (ventas, ciudad) {
    return ventas
    .filter(v => normalizar(v.ciudad) === normalizar(ciudad))
    .reduce((acum, v) => acum + valorVentas(v), 0);
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const v of ventas) unidades += v.cantidad;
  return unidades;
}

function unidadesVendidasM(ventas) {
    return ventas
    .reduce((acum, v) => acum + v.cantidad, 0);
}

// Total ÷ cantidad de ventas válidas (cantidad > 0)
function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      total += valorVentas(v);
      validas++;
    }
  }
  return validas === 0 ? 0 : total / validas;
}

const nombreCiudad = (texto) => {
  const t = normalizar(texto);
  return t[0].toUpperCase() + t.slice(1);   // "medellín " → "Medellín"
};

function totalPorCiudad(ventas) {
  return ventas.reduce((acc, v) => {
    const c = nombreCiudad(v.ciudad);
    acc[c] = (acc[c] || 0) + valorVentas(v);
    return acc;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((acc, v) => {
    const p = v.producto.trim();
    acc[p] = (acc[p] || 0) + v.cantidad;
    return acc;
  }, {});
}

// Los k productos con más valor vendido, de mayor a menor (solo los nombres)
function topProductosPorValor(ventas, k) {
  const porProducto = ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + valorVentas(v);
    return acc;
  }, {});
  
  return Object.entries(porProducto)   // arreglo nuevo: no toca "ventas"
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([producto]) => producto);
}

module.exports = {
  totalVendido, totalVendidoM,
  unidadesVendidas, unidadesVendidasM,
  ventasPorCiudad, ventasPorCiudadM,
  ticketPromedio,
  ventaMayor, totalPorCiudad, 
  unidadesPorProducto, topProductosPorValor
};

if (require.main === module) {
//Entrada con arreglo completo
console.log(totalVendidoM(ventas));
console.log(unidadesVendidasM(ventas));
console.log(ventasPorCiudadM(ventas, "medellín"));
console.log(totalPorCiudad(ventas));
console.log(unidadesPorProducto(ventas));
console.log(topProductosPorValor(ventas));

console.log(totalVendido(ventas), unidadesVendidas(ventas), ventaMayor(ventas).id);
console.log(Math.round(ticketPromedio(ventas)), ventasPorCiudad(ventas, "medellín"));

//Entrrada con un solo elemento
console.log(totalVendido([ventas[2]]), unidadesVendidas([ventas[2]]), ventaMayor([ventas[2]]).id);
console.log(Math.round(ticketPromedio([ventas[2]])), ventasPorCiudad([ventas[2]], "medellín"));

//Entrada con un arreglo vacío
console.log(totalVendido([]), unidadesVendidas([]), ventaMayor([]));
console.log(Math.round(ticketPromedio([])), ventasPorCiudad([], "medellín"));
}







