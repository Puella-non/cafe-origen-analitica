const ventas = require("./datos");
const f = require("./analitica");

const ANCHO = 46;

const moneda = (n) => "$" + Math.round(n).toLocaleString("es-CO");

// Etiqueta a la izquierda y valor alineado a la derecha
function fila(etiqueta, valor) {
  const v = String(valor);
  const espacios = Math.max(1, ANCHO - etiqueta.length - v.length);
  return etiqueta + " ".repeat(espacios) + v;
}

function titulo(texto) {
  console.log("\n" + texto);
  console.log("-".repeat(ANCHO));
}

// Resumen de cualquier arreglo de ventas (todo el período o un solo día)
function resumen(datos) {
  console.log(fila("Ventas registradas", datos.length));
  console.log(fila("Total vendido", moneda(f.totalVendido(datos))));
  console.log(fila("Unidades vendidas", f.unidadesVendidas(datos)));
  console.log(fila("Ticket promedio", moneda(f.ticketPromedio(datos))));
  const mayor = f.ventaMayor(datos);
  console.log(
    mayor
      ? fila("Venta mayor", `#${mayor.id} ${moneda(mayor.cantidad * mayor.precio)}`)
      : fila("Venta mayor", "sin ventas")
  );
}

function resumenDia(datos, fecha) {
  const delDia = f.ventasDelDia(datos, fecha);
  titulo(`RESUMEN DEL DÍA ${fecha}`);
  if (delDia.length === 0) console.log("No hubo ventas este día.");
  resumen(delDia);
}

function reporte(datos) {
  console.log("=".repeat(ANCHO));
  console.log("REPORTE DE VENTAS: CAFÉ ORIGEN".padStart((ANCHO + 30) / 2));
  console.log("=".repeat(ANCHO));

  titulo("1. RESUMEN GENERAL");
  resumen(datos);

  titulo("2. VENTAS POR CIUDAD");
  const ciudades = Object.entries(f.totalPorCiudad(datos)).sort((a, b) => b[1] - a[1]);
  if (ciudades.length === 0) console.log("Sin ventas");
  for (const [ciudad, total] of ciudades) {
    console.log(fila(ciudad, moneda(total)));
  }

  titulo("3. UNIDADES POR PRODUCTO");
  const unidades = Object.entries(f.unidadesPorProducto(datos)).sort((a, b) => b[1] - a[1]);
  if (unidades.length === 0) console.log("Sin ventas");
  for (const [producto, cant] of unidades) {
    console.log(fila(producto, cant));
  }

  titulo("4. TOP 3 PRODUCTOS POR VALOR");
  const top = f.topProductosPorValor(datos, 3);
  if (top.length === 0) console.log("Sin ventas");
  top.forEach((producto, i) => {
    const valor = f.totalVendido(datos.filter((v) => v.producto === producto));
    console.log(fila(`${i + 1}. ${producto}`, moneda(valor)));
  });

  resumenDia(datos, "2026-09-05"); // día con ventas
  resumenDia(datos, "2026-09-07"); // día sin ventas
  console.log("");
}

reporte(ventas);