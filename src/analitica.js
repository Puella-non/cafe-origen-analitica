const ventas = require("./datos");


const valorVentas = (venta) => venta.cantidad * venta.precio;
const normalizar = (texto) => texto.trim().toLowerCase();

function totalVendido(ventas) {
    let total = 0;
    for (const v of ventas) total += valorVentas(v);
    return total;
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

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const v of ventas) unidades += v.cantidad;
  return unidades;
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

//Entrada con arreglo completo
console.log(totalVendido(ventas), unidadesVendidas(ventas), ventaMayor(ventas).id);
console.log(Math.round(ticketPromedio(ventas)), ventasPorCiudad(ventas, "medellín"));

//Entrrada com un solo elemento
console.log(totalVendido([ventas[2]]), unidadesVendidas([ventas[2]]), ventaMayor([ventas[2]]).id);
console.log(Math.round(ticketPromedio([ventas[2]])), ventasPorCiudad([ventas[2]], "medellín"));

//Entrada con un arreglo vacío
console.log(totalVendido([]), unidadesVendidas([]), ventaMayor([]));
console.log(Math.round(ticketPromedio([])), ventasPorCiudad([], "medellín"));






