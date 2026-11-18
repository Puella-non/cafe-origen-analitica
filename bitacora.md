Problemas en la tabla:                                       decisión:
1. Venta 8 tiene cantidad cero.                              No cuenta en el ticket.
2. En ciudad hay un "medellín" con minúscula.                Normalizar antes de comparar.
3. Hay ciudades escritas con espacio.                        Normalizar antes de comparar.


## Diccionario de datos: `ventas`

Cada elemento del arreglo representa una venta (una transacción), no un cliente.

| Propiedad | Tipo   | Significado |
|-----------|--------|-------------|
| id        | number | Identificador único de la venta. Va de 1 a 12 y no se repite. |
| fecha     | string | Fecha de la venta en formato `AAAA-MM-DD` (ej. "2026-09-01"). Es texto, no un objeto Date. |
| cliente   | string | Código del cliente que realizó la compra (ej. "C01"). Puede repetirse: un mismo cliente puede tener varias ventas. |
| producto  | string | Nombre del producto vendido, incluyendo presentación (ej. "Origen Huila 500 g", "Prensa francesa"). |
| ciudad    | string | Ciudad donde se hizo la venta o entrega (Medellín, Bogotá, Cali, Pereira). |
| cantidad  | number | Número de unidades vendidas en la transacción. |
| precio    | number | Precio por unidad en pesos colombianos (COP). No es el total de la venta. |

**Dato derivado (no existe en la tabla):** total de la venta = `cantidad * precio`.

-----------------------------------------------------------------------------------------------------------
Pruebas con las cinco primeras funciones de analitica.js:

¿Qué debería devolver cada función con el arreglo vacío?
totalVendido([]): Debería devolver 0.
unidadesVendidas([]): Debería devolver 0.
ventaMayor([]): Debería devolver null.
ticketPromedio([]): Debería devolver 0.
ventasPorCiudad([], "medellín"): Debería devolver 0.

Entrada con arreglo completo:
985000 21 10
89545 356000

Entrrada com un solo elemento:
95000 1 3
95000 0

Entrada con un arreglo vacío:
0 0 null
0 0

## Verificación a mano

### Traza 1: ventasPorCiudad(ventas, "medellín")

Solo cuentan las ventas de Medellín (ids 1, 4, 5 y 11). `normalizar` quita espacios y minúsculas, por eso "medellín " y "Medellín  " también cuentan.

| id | cantidad × precio  | total acumulado |
|----|--------------------|-----------------|
| 1  | 2 × 42000 = 84000  | 84000           |
| 4  | 1 × 42000 = 42000  | 126000          |
| 5  | 3 × 45000 = 135000 | 261000          |
| 11 | 1 × 95000 = 95000  | 356000          |

A mano: 356000. Programa: 356000 coinciden

### Traza 2: ventaMayor(ventas)

Se calcula cantidad × precio de cada venta y gana la mayor.

| id | valor  |
|----|--------|
| 1  | 84000  |
| 2  | 26000  |
| 3  | 95000  |
| 4  | 42000  |
| 5  | 135000 |
| 6  | 52000  |
| 7  | 120000 |
| 8  | 0      |
| 9  | 90000  |
| 10 | 168000 |
| 11 | 95000  |
| 12 | 78000  |

El mayor es 168000, de la venta 10.
A mano: id 10. Programa: 10 coinciden





