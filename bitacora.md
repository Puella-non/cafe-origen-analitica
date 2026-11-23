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
----------------------------------------------------------------------------------------------------------------------------------

## Las cinco preguntas de cada función

### totalVendido
- ¿Qué recorro? Todas las ventas, con `for...of`.
- ¿Qué filtro? Nada.
- ¿Qué transformo? Cada venta en su valor (cantidad × precio).
- ¿Qué acumulo? La suma de los valores en `total`.
- ¿Cómo agrupo? No agrupo.

### totalVendidoM
- ¿Qué recorro? Todas las ventas, con `reduce`.
- ¿Qué filtro? Nada.
- ¿Qué transformo? Cada venta en su valor.
- ¿Qué acumulo? La suma de los valores en `acum`.
- ¿Cómo agrupo? No agrupo.

### ventaMayor
- ¿Qué recorro? Todas las ventas.
- ¿Qué filtro? Nada. Solo reemplazo `mayor` si el valor es estrictamente mayor.
- ¿Qué transformo? Cada venta en su valor, solo para comparar.
- ¿Qué acumulo? No sumo; guardo la venta mayor hasta el momento.
- ¿Cómo agrupo? No agrupo.

### ventasPorCiudad
- ¿Qué recorro? Todas las ventas.
- ¿Qué filtro? Las de la ciudad pedida (usando `normalizar`).
- ¿Qué transformo? Cada venta en su valor.
- ¿Qué acumulo? La suma de los valores de esa ciudad.
- ¿Cómo agrupo? No agrupo.

### ventasPorCiudadM
- ¿Qué recorro? Todas las ventas.
- ¿Qué filtro? Con `filter`, las de la ciudad pedida.
- ¿Qué transformo? Cada venta en su valor.
- ¿Qué acumulo? La suma de los valores con `reduce`.
- ¿Cómo agrupo? No agrupo.

### unidadesVendidas
- ¿Qué recorro? Todas las ventas.
- ¿Qué filtro? Nada.
- ¿Qué transformo? Nada; uso `cantidad` directo.
- ¿Qué acumulo? La suma de las unidades.
- ¿Cómo agrupo? No agrupo.

### unidadesVendidasM
- ¿Qué recorro? Todas las ventas, con `reduce`.
- ¿Qué filtro? Nada.
- ¿Qué transformo? Nada.
- ¿Qué acumulo? La suma de las unidades.
- ¿Cómo agrupo? No agrupo.

### ticketPromedio
- ¿Qué recorro? Todas las ventas.
- ¿Qué filtro? Solo las ventas válidas (cantidad > 0).
- ¿Qué transformo? Cada venta en su valor.
- ¿Qué acumulo? La suma de los valores y un contador de ventas válidas.
- ¿Cómo agrupo? No agrupo. Al final divido total ÷ ventas válidas.

### nombreCiudad (función auxiliar)
- ¿Qué recorro? Nada; recibe un solo texto.
- ¿Qué filtro? Nada.
- ¿Qué transformo? El texto: sin espacios, en minúscula y con la inicial en mayúscula.
- ¿Qué acumulo? Nada.
- ¿Cómo agrupo? No agrupo, pero sirve de clave para agrupar.

### totalPorCiudad
- ¿Qué recorro? Todas las ventas, con `reduce`.
- ¿Qué filtro? Nada.
- ¿Qué transformo? La ciudad en nombre normalizado y la venta en su valor.
- ¿Qué acumulo? La suma de los valores de cada ciudad.
- ¿Cómo agrupo? Con un objeto cuya clave es la ciudad normalizada.

### unidadesPorProducto
- ¿Qué recorro? Todas las ventas, con `reduce`.
- ¿Qué filtro? Nada.
- ¿Qué transformo? El producto, sin espacios sobrantes.
- ¿Qué acumulo? La suma de las unidades de cada producto.
- ¿Cómo agrupo? Con un objeto cuya clave es el producto.

### topProductosPorValor
- ¿Qué recorro? Todas las ventas y luego las parejas [producto, valor].
- ¿Qué filtro? Me quedo con los k primeros (`slice(0, k)`).
- ¿Qué transformo? Ordeno de mayor a menor (`sort`) y dejo solo los nombres (`map`).
- ¿Qué acumulo? La suma de los valores de cada producto.
- ¿Cómo agrupo? Con un objeto cuya clave es el producto.
--------------------------------------------------------------------------------------------------------------------------------------------

## Depuración de errores reportados por la gerente

Versión preliminar reconstruida a partir de la descripción de la gerente. Está en `src/depurar.js`.

### Error 1: "Bogotá aparecía dos veces"

- **Síntoma:** la misma ciudad aparecía en dos filas separadas, con totales parciales.
- **Entrada que lo produce:** dos ventas de Bogotá, una con "Bogotá" y otra con "Bogotá " (espacio al final).
- **Hipótesis:** las claves se ven iguales pero son textos distintos por espacios sobrantes.
- **Prueba realizada:** imprimí la longitud de cada clave: [6, 7].
- **Causa:** la versión preliminar usa `v.ciudad` como clave sin limpiar el texto.
- **Corrección:** `totalPorCiudad` usa `nombreCiudad`, que aplica `normalizar` (`trim` + `toLowerCase`) antes de agrupar.
- **Demostración de que ya no ocurre:**
  - Preliminar: `{ 'Bogotá': 95000, 'Bogotá ': 95000 }` → 2 claves, longitudes [6, 7]
  - Actual: `{ 'Bogotá': 190000 }` → 1 clave
  - Con `datos.js`, la actual devuelve exactamente 4 ciudades.
  - Con `node src/explorar` se ven los espacios sobrantes en las ciudades de las ventas 5, 9 y 11 (por ejemplo `[medellín ]`).

### Error 2: "El ticket promedio daba NaN en un día sin ventas"

- **Síntoma:** el ticket promedio mostraba NaN.
- **Entrada que lo produce:** arreglo vacío, por ejemplo `ventasDelDia(ventas, "2026-09-07")`.
- **Hipótesis:** se divide 0 entre 0 porque no hay ventas.
- **Prueba realizada:** ejecuté la versión preliminar con `[]` y luego `ticketPromedio` con el mismo arreglo.
- **Causa:** la versión preliminar divide `total / datos.length` sin comprobar que haya ventas.
- **Corrección:** `ticketPromedio` devuelve 0 si no hay ventas válidas: `validas === 0 ? 0 : total / validas`.
- **Demostración de que ya no ocurre:**
  - Preliminar: `NaN`
  - Actual: `0` (`Number.isNaN` → `false`)

### Salida completa de la consola

```
PS C:\Users\laura\Downloads\cafe-origen-analitica> node src/depurar
=== ERROR 1: ciudad duplicada ===
Preliminar, entrada mínima: { 'Bogotá': 95000, 'Bogotá ': 95000 }
Longitud de cada clave: [ 6, 7 ]
Preliminar, datos.js: [
  'Medellín',
  'Bogotá',
  'Cali',
  'medellín ',
  'Cali ',
  'Pereira',
  'Medellín  '
]
Actual, entrada mínima: { 'Bogotá': 190000 }
Actual, datos.js: [ 'Medellín', 'Bogotá', 'Cali', 'Pereira' ]

=== ERROR 2: ticket promedio NaN ===
Ventas del 2026-09-07: []
Preliminar: NaN
Actual: 0
¿Actual es NaN? false
```
-----------------------------------------------------------------------------------------------------------------------------

## Predicción: si n se multiplica por 10, ¿las operaciones se multiplican por cuánto?

| Función | Predicción | Razón |
|---------|-----------|-------|
| totalVendido | × 10 | Una operación por venta: recorre todas una vez |
| totalPorCiudad | × 10 | Una pasada por las ventas; las ciudades (4) no crecen con n |
| ventaMayor | × 10 | Una pasada comparando cada venta con la mayor |
| primeraVenta | × 1 | Solo mira la posición 0, sin importar cuántas ventas haya |




