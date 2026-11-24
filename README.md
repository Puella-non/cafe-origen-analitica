# Café Origen: Analítica de ventas (v0.1)

## ¿Qué es este proyecto?

Un motor de análisis de ventas para Café Origen, hecho en JavaScript (Node.js). Lee un registro de ventas (`src/datos.js`) y genera un reporte legible en la consola, sin necesidad de abrir ni modificar el código.

Cada registro es una venta con: `id`, `fecha`, `cliente`, `producto`, `ciudad`, `cantidad` y `precio` (precio por unidad en pesos colombianos).

## Cómo ejecutarlo

Requisito: tener [Node.js](https://nodejs.org) instalado.

Desde la carpeta del proyecto:

```bash
node src/reporte
```

Muestra el reporte completo: resumen general, ventas por ciudad, unidades por producto, top 3 de productos por valor y el resumen de dos días (uno con ventas y otro sin ventas).

Otros comandos:

```bash
node src/verificar   # comprueba que la versión con ciclos y la versión con métodos den el mismo resultado (OK / DIFERENTE)
node src/depurar     # reproduce los dos errores reportados por la gerente y muestra que ya no ocurren
node src/explorar    # muestra los datos originales en una tabla para revisarlos
```

## ¿Qué preguntas responde?

- ¿Cuánto se vendió en total?
- ¿Cuántas unidades se vendieron?
- ¿Cuál es el ticket promedio por venta?
- ¿Cuál fue la venta de mayor valor?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Cuáles son los 3 productos que más dinero generaron?
- ¿Cómo le fue a un día específico? (incluye días sin ventas)

## Estructura del proyecto

```
src/
  datos.js       Registro de ventas
  analitica.js   Funciones de análisis (totales, grupos, top, ventas del día)
  reporte.js     Reporte de negocio por consola
  verificar.js   Comprueba que ciclo y métodos den lo mismo
  explorar.js    Muestra los datos tal cual: cantidad de registros, primero, último y tabla
  depurar.js     Reproduce los errores reportados y su corrección
bitacora.md      Decisiones, pruebas y depuración
README.md        Qué es el proyecto, cómo ejecutarlo y qué preguntas responde
```

## Decisiones de diseño

- **Sin ventas:** los totales y el ticket promedio devuelven `0`; `ventaMayor` devuelve `null`; las agrupaciones devuelven `{}` y el top

