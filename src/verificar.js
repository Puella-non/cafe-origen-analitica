const ventas = require("./datos");
const funciones = require("./analitica");

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
}

// Comprobar que ventas conserva su orden original
const idsAntes = ventas.map(v => v.id).join(",");

funciones.topProductosPorValor(ventas, 3);
funciones.ventasOrdenadasPorValor(ventas);

const idsDespues = ventas.map(v => v.id).join(",");
console.log(`Orden de ventas conservado: ${idsAntes === idsDespues ? "OK" : "DIFERENTE"}`);
