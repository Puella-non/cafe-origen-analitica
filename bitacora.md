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
