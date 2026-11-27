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

// Ventas ordenadas de mayor a menor valor, sin modificar el original
function ventasOrdenadasPorValor(ventas) {
  return [...ventas].sort((a, b) => valorVentas(b) - valorVentas(a));
}

// Ventas de una fecha exacta (formato "AAAA-MM-DD"). Si no hay, devuelve []
function ventasDelDia(ventas, fecha) {
  return ventas.filter(v => v.fecha === fecha);
}

// Versión de referencia (solo para comparar en verificar.js): map → filter → map → reduce
function totalCiudadCadena(ventas, ciudad) {
  const buscada = normalizar(ciudad);
  return ventas
    .map(v => ({ ...v, ciudad: normalizar(v.ciudad) }))   // 1. normaliza la ciudad
    .filter(v => v.ciudad === buscada)                     // 2. se queda con la ciudad pedida
    .map(v => valorVentas(v))                              // 3. convierte cada venta en su valor
    .reduce((acum, valor) => acum + valor, 0);             // 4. suma
}

// VERSIÓN DEL MOTOR: un solo ciclo, sin arreglos intermedios
function totalCiudadUnaPasada(ventas, ciudad) {
  const buscada = normalizar(ciudad);   // se calcula una sola vez
  let total = 0;                        // el único dato extra: un número
  for (const v of ventas) {
    if (normalizar(v.ciudad) === buscada) {
      total += valorVentas(v);
    }
  }
  return total;
}

module.exports = {
  totalVendido, totalVendidoM,
  unidadesVendidas, unidadesVendidasM,
  ventasPorCiudad, ventasPorCiudadM,
  ticketPromedio,
  ventaMayor, totalPorCiudad, 
  unidadesPorProducto, topProductosPorValor,
  ventasOrdenadasPorValor, ventasDelDia,
  valorVentas, normalizar, nombreCiudad,
  totalCiudadCadena, totalCiudadUnaPasada
};

if (require.main === module) {
//Entrada con arreglo completo
console.log(totalVendidoM(ventas));
console.log(unidadesVendidasM(ventas));
console.log(ventasPorCiudadM(ventas, "medellín"));
console.log(totalPorCiudad(ventas));
console.log(unidadesPorProducto(ventas));
console.log(topProductosPorValor(ventas, 3));

console.log(totalVendido(ventas), unidadesVendidas(ventas), ventaMayor(ventas).id);
console.log(Math.round(ticketPromedio(ventas)), ventasPorCiudad(ventas, "medellín"));

//Entrrada con un solo elemento
console.log(totalVendido([ventas[2]]), unidadesVendidas([ventas[2]]), ventaMayor([ventas[2]]).id);
console.log(Math.round(ticketPromedio([ventas[2]])), ventasPorCiudad([ventas[2]], "medellín"));

//Entrada con un arreglo vacío
console.log(totalVendido([]), unidadesVendidas([]), ventaMayor([]));
console.log(Math.round(ticketPromedio([])), ventasPorCiudad([], "medellín"));

// Semana 1 día 2 reto 7
console.log(totalCiudadCadena(ventas, "medellín"));  
console.log(totalCiudadCadena(ventas, "Bogotá "));   
console.log(totalCiudadCadena(ventas, "Cali"));       
console.log(totalCiudadCadena([], "medellín"));  
}







