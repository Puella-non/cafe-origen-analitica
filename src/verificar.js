const ventas = require("./datos");
const funciones = require("./analitica");
const { generarVentas } = require("./generador");

function comparar(nombre, resultadoCiclo, resultadoMetodo) {
  const estado = resultadoCiclo === resultadoMetodo ? "OK" : "DIFERENTE";
  console.log(`${nombre}: ${estado} (ciclo=${resultadoCiclo}, métodos=${resultadoMetodo})`);
}

const casos = [
  { etiqueta: "completo", datos: ventas },
  { etiqueta: "un elemento", datos: [ventas[2]] },
  { etiqueta: "vacío", datos: [] },
];

for (const caso of casos) {
  console.log(`--- Entrada: ${caso.etiqueta} ---`);
  comparar("totalVendido", funciones.totalVendido(caso.datos), funciones.totalVendidoM(caso.datos));
  comparar("unidadesVendidas", funciones.unidadesVendidas(caso.datos), funciones.unidadesVendidasM(caso.datos));
  comparar("ventasPorCiudad", funciones.ventasPorCiudad(caso.datos, "medellín"), funciones.ventasPorCiudadM(caso.datos, "medellín"));
  
  comparar(
  "totalCiudadCadena",                                       // nombre que se muestra en pantalla
  funciones.ventasPorCiudad(caso.datos, "medellín"),         // resultado de la versión con ciclo (la de referencia)
  funciones.totalCiudadCadena(caso.datos, "medellín")        // resultado de la versión con cadena (la nueva)
  );

  comparar("totalCiudadUnaPasada", funciones.ventasPorCiudad(caso.datos, "medellín"), funciones.totalCiudadUnaPasada(caso.datos, "medellín"));
}

// Comprobar que ventas conserva su orden original
const idsAntes = ventas.map(v => v.id).join(",");

funciones.topProductosPorValor(ventas, 3);
funciones.ventasOrdenadasPorValor(ventas);

const idsDespues = ventas.map(v => v.id).join(",");
console.log(`Orden de ventas conservado: ${idsAntes === idsDespues ? "OK" : "DIFERENTE"}`);    

// Comprobación con 10.000 ventas generadas
const grandes = generarVentas(10000);
for (const ciudad of ["Medellín", "Bogotá", "Cali", "Pereira"]) {
  comparar(
    `cadena vs una pasada (${ciudad}, n=10000)`,
    funciones.totalCiudadCadena(grandes, ciudad),
    funciones.totalCiudadUnaPasada(grandes, ciudad)
  );
}