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

## Medición: ¿se cumplió la predicción?

Ejecuté `node src/medir` con ventas generadas por `generarVentas(100)` y `generarVentas(1000)`:

```
--- n = 100 ---
totalVendido → ops: 100
totalPorCiudad → ops: 100
ventaMayor → ops: 100
primeraVenta → ops: 1
--- n = 1000 ---
totalVendido → ops: 1000
totalPorCiudad → ops: 1000
ventaMayor → ops: 1000
primeraVenta → ops: 1
```
| Función | Predicción | Medido | ¿Coincide? |
|---------|-----------|--------|------------|
| totalVendido | × 10 | 100 → 1000 (× 10) | Sí |
| totalPorCiudad | × 10 | 100 → 1000 (× 10) | Sí |
| ventaMayor | × 10 | 100 → 1000 (× 10) | Sí |
| primeraVenta | × 1 | 1 → 1 (× 1) | Sí |

## Medición con cuatro tamaños

| Función | n = 100 | n = 1.000 | n = 10.000 | n = 100.000 |
|---------|---------|-----------|------------|-------------|
| totalVendido | 100 | 1.000 | 10.000 | 100.000 |
| totalPorCiudad | 100 | 1.000 | 10.000 | 100.000 |
| ventaMayor | 100 | 1.000 | 10.000 | 100.000 |
| primeraVenta | 1 | 1 | 1 | 1 |

Cada vez que n se multiplica por 10, las tres primeras funciones multiplican sus operaciones por 10 (crecimiento lineal). `primeraVenta` se mantiene en 1 (constante). Las cuatro predicciones se cumplieron.

## Comparación de predicciones y clasificación

| Función | Predicción | Medido (n = 100 → 100.000) | ¿Coincide? | Clasificación |
|---------|-----------|----------------------------|------------|---------------|
| totalVendido | × 10 | 100 → 100.000 (× 10 cada vez) | Sí | O(n) |
| totalPorCiudad | × 10 | 100 → 100.000 (× 10 cada vez) | Sí | O(n) |
| ventaMayor | × 10 | 100 → 100.000 (× 10 cada vez) | Sí | O(n) |
| primeraVenta | × 1 | 1 → 1 (× 1 cada vez) | Sí | O(1) |

### totalVendido: O(n)
- **Código:** un solo `for...of` que recorre todas las ventas y hace `c.ops++` una vez por venta.
- **Números:** con n = 100.000 hizo 100.000 operaciones, o sea n operaciones. Al pasar de 100 a 1.000 se multiplicó por 10, igual que n.

### totalPorCiudad: O(n)
- **Código:** un solo `for...of`. Dentro del ciclo, buscar o actualizar una ciudad en el objeto cuenta como un paso, y las ciudades (4) no crecen con n.
- **Números:** mismas operaciones que `totalVendido` en todos los tamaños (× 10 cada vez).

### ventaMayor: O(n)
- **Código:** un solo `for...of` que compara cada venta con la mayor hasta el momento. Dentro del ciclo hace dos cálculos de valor, pero es una cantidad fija por vuelta, no crece con n.
- **Números:** 100 → 1.000 → 10.000 → 100.000 operaciones (× 10 cada vez).

### primeraVenta: O(1)
- **Código:** no tiene ciclo; solo mira `ventas[0]`.
- **Números:** hizo 1 operación con n = 100 y también con n = 100.000 (× 1 cada vez).

### ¿Alguna es O(n²)?
Ninguna. Para que una función fuera O(n²) tendría que tener un ciclo dentro de otro, ambos recorriendo las ventas (por ejemplo, comparar cada venta con todas las demás). Con n × 10, sus operaciones se multiplicarían por 100. Ninguna de las funciones medidas lo hace: todas tienen a lo sumo un ciclo.

### Conclusión
Las cuatro predicciones se cumplieron. Con 100.000 ventas, las funciones lineales hacen 100.000 operaciones y `primeraVenta` hace 1.

--------------------------------------------------------------------------------------------------------------------------------------------------
## Traza de clientesRecurrentes con 5 ventas

Clientes por posición: [C01, C02, C01, C03, C02]

| i | cliente i | j recorridos | Comparaciones | ¿Coinciden? | recurrentes después |
|---|-----------|--------------|---------------|-------------|---------------------|
| 0 | C01 | 1, 2, 3, 4 | 4 | j=2 (C01 = C01) → agrega C01 | [C01] |
| 1 | C02 | 2, 3, 4 | 3 | j=4 (C02 = C02) → agrega C02 | [C01, C02] |
| 2 | C01 | 3, 4 | 2 | ninguna | [C01, C02] |
| 3 | C03 | 4 | 1 | ninguna | [C01, C02] |
| 4 | C02 | (ninguno) | 0 | no hay ciclo interno | [C01, C02] |

**Total de comparaciones: 4 + 3 + 2 + 1 + 0 = 10**
**Resultado:** [C01, C02]

Con la tabla se ve que C03 aparece una sola vez, así que no es recurrente.

## Generalización: comparaciones con n ventas

- Con i = 0 se hacen n − 1 comparaciones.
- Con i = 1 se hacen n − 2.
- ... y así hasta i = n − 1, que hace 0.

Total = (n − 1) + (n − 2) + ... + 2 + 1 + 0 = **n × (n − 1) / 2**

Por qué da esa fórmula: si sumas la serie con ella misma al revés, cada pareja suma n − 1, y hay n parejas. Eso da n × (n − 1), que cuenta todo dos veces, así que se divide entre 2.

Verificación:
- n = 5 → 5 × 4 / 2 = 10 ✔ (coincide con la traza)
- n = 12 (datos reales) → 12 × 11 / 2 = 66

| n | n × (n − 1) / 2 |
|---|-----------------|
| 100 | 4.950 |
| 1.000 | 499.500 |
| 10.000 | 49.995.000 |

Cuando n se multiplica por 10, las comparaciones se multiplican por casi 100. El término dominante es n² / 2, por eso la función es **O(n²)**.
--------------------------------------------------------------------------------------------------------------------------------------------------

## Tiempo de ejecución de clientesRecurrentes

Medido con `console.time` y `console.timeEnd`, con datos de `generarVentas(n)`.

| n | Tiempo (ms) | Factor frente al anterior |
|---|-------------|---------------------------|
| 1.000 | 10,49 | — |
| 2.000 | 39,51 | × 3,77 |
| 4.000 | 124,61 | × 3,15 |
| 8.000 | 549,56 | × 4,41 |
| 16.000 | 2257 | × 4,11 |

--------------------------------------------------------------------------------------------------------------------------------------------------
## Análisis: ¿qué pasa con el tiempo cuando n se duplica?

Al duplicar n, el tiempo de `clientesRecurrentes` se multiplicó por cerca de 4 en todas las mediciones (entre 3,15 y 4,41). Con 1.000 ventas tardó 10,49 ms y con 16.000 tardó 2257 ms.

Esto coincide con O(n²): la función tiene un ciclo dentro de otro, así que hace n × (n − 1) / 2 comparaciones. Si n se duplica, (2n)² = 4n², o sea 4 veces más comparaciones y, por tanto, unas 4 veces más tiempo. Si la función fuera lineal, el tiempo solo se duplicaría.

De n = 1.000 a n = 16.000 (n × 16), el tiempo creció unas 215 veces, cerca de 16² = 256, lo que confirma el crecimiento cuadrático.

--------------------------------------------------------------------------------------------------------------------------------------------------
## Estimación de tiempo para n grande

Fórmula (O(n²)): tiempo nuevo = tiempo base × (n nuevo / n base)².
Base: n = 16.000 → 2257 ms (primera corrida). En una segunda corrida dio 1861 ms; los tiempos varían entre ejecuciones.

| n | Cálculo | Tiempo estimado |
|---|---------|-----------------|
| 100.000 | 2257 ms × 6,25² = 2257 × 39,06 | ≈ 88 s (≈ 1,5 min) |
| 1.000.000 | 2257 ms × 62,5² = 2257 × 3.906 | ≈ 8.816 s (≈ 2,4 horas) |

**Decisión:** la estimación para 100.000 (≈ 88 s) es menor a dos minutos, así que se ejecutó. Para 1.000.000 no se ejecutó, porque tardaría unas 2,4 horas.

**Resultado:** tiempo medido para n = 100.000: 90,13 s (1:30,128). Diferencia frente a la estimación: +2,1 s (≈ 2,4 %). Con la base de 1861 ms de la segunda corrida, la estimación habría sido ≈ 73 s, es decir, 20 % menos que lo medido.

**Estimación recalculada para 1.000.000:** con la medición real de 100.000, 90,13 s × 10² = 9.013 s ≈ 2,5 horas.
----------------------------------------------------------------------------------------------------------------------------
## Costo oculto: `recurrentes.includes`
includes recorre recurrentes en cada coincidencia, en el peor caso añade un factor proporcional al tamaño de esa lista, por lo que la complejidad puede superar O(n²).

## Conclusión para la gerente: ¿por qué el reporte se vuelve lento?

La mayoría de las cuentas del reporte (total vendido, ventas por ciudad, venta mayor) revisan cada venta una sola vez, así que siguen siendo rápidas incluso con 100.000 ventas.

La lentitud aparece al buscar los **clientes que compran más de una vez**: el programa compara cada venta con todas las demás. Por eso, con el doble de ventas el trabajo se multiplica por 4, y con 10 veces más se multiplica por unas 100.

Lo medimos: con 16.000 ventas tarda cerca de 2 segundos y con 100.000 tarda 1 minuto y medio. Con 1.000.000 tardaría unas 2,5 horas (estimado).

Con las 12 ventas actuales no se nota, pero si el negocio crece, esta cuenta sería la primera en volverse inmanejable. 
-------------------------------------------------------------------------------------------------------------------------------------------------------------

## Cadena vs una pasada

| | totalCiudadCadena | totalCiudadUnaPasada |
|---|---|---|
| Recorridos | 4 | 1 |
| Arreglos nuevos | 3 | 0 |
| Tiempo | O(n) | O(n) |
| Espacio | O(n) | O(1) |

Las dos tardan más o menos lo mismo en crecer con n. La diferencia es la memoria: la cadena crea arreglos que crecen con las ventas, y la de una pasada solo usa dos variables.

## ¿Por qué las dos son O(n) en tiempo si una recorre 4 veces?

La cadena hace unos 4n pasos y la de una pasada hace n pasos. En Big O se eliminan las constantes: 4n se simplifica a n, porque lo que importa es cómo crece el tiempo cuando n crece, no cuántas veces se repite un recorrido.

Si n se multiplica por 10, la cadena pasa de 4n a 40n (× 10) y la de una pasada de n a 10n (× 10). Las dos crecen igual de rápido; la cadena solo es unas 4 veces más lenta en cada tamaño.

## Complejidad espacial de las funciones del motor

n = ventas. Se cuenta solo la memoria extra, sin contar el arreglo de entrada.

| Función | Espacio | Por qué |
|---------|---------|---------|
| totalVendido, totalVendidoM | O(1) | Solo un número (`total`) |
| unidadesVendidas, unidadesVendidasM | O(1) | Solo un número |
| ventasPorCiudad, ventasPorCiudadM | O(1)* | Un número. *`ventasPorCiudadM` crea un arreglo con `filter`, así que en realidad es O(n) |
| ventaMayor | O(1) | Solo guarda una referencia a la mayor |
| ticketPromedio | O(1) | Dos números |
| totalCiudadUnaPasada | O(1) | Dos variables |
| totalCiudadCadena | O(n) | Crea 3 arreglos que crecen con n |
| totalPorCiudad | O(1)** | Un objeto con una clave por ciudad |
| unidadesPorProducto | O(1)** | Un objeto con una clave por producto |
| topProductosPorValor | O(p) | Objeto con p productos, más `Object.entries`, que copia todo a un arreglo |
| ventasOrdenadasPorValor | O(n) | `[...ventas]` copia todo el arreglo |
| ventasDelDia | O(n) | `filter` crea un arreglo nuevo (hasta n ventas) |
| clientesRecurrentes | O(c) | Lista `recurrentes` con hasta c clientes |

## Decisión: qué versión de totalCiudad queda en el motor

**Decisión:** dejo `totalCiudadUnaPasada`.

**Por qué (recursos):** da el mismo resultado que la cadena, pero hace 1 recorrido en vez de 4, no crea arreglos nuevos y usa memoria constante (O(1)). La cadena usa memoria que crece con las ventas (O(n)), y el servidor tiene memoria limitada.

**Por qué (legibilidad):** la cadena se lee un poco más fácil, porque cada paso tiene un nombre (`map`, `filter`, `reduce`). Pero la versión de una pasada también es corta y clara: son 4 líneas, y con un comentario se entiende igual. La ganancia de la cadena en lectura es pequeña y el costo en memoria es real.

**Qué hago con la otra:** `totalCiudadCadena` se queda solo como referencia para comparar en `verificar.js`, y no se usa en el reporte.
