Explicación de la lógica de ordenamiento (Sort)

En este proyecto, el ordenamiento de la tabla se implementó de forma dinámica al hacer clic en los encabezados de cada columna. Cada columna puede ordenarse de forma ascendente o descendente según la interacción del usuario.

¿Cómo funciona?

Cada encabezado de la tabla se genera dinámicamente a partir de las propiedades de los datos cargados. A cada encabezado se le asigna un evento de clic que identifica qué columna se quiere ordenar.

Cuando el usuario hace clic sobre una columna:

Se identifica la columna seleccionada mediante su nombre (clave del objeto).
Si el usuario hace clic sobre la misma columna varias veces, se alterna el sentido del orden (ascendente ↔ descendente).
Se utiliza la función sort() de JavaScript para ordenar el arreglo de datos según la columna seleccionada.
Después de ordenar, la tabla se vuelve a renderizar con los datos ya ordenados.
Detalles de implementación
Se mantiene una variable sortKey para recordar qué columna está siendo utilizada para ordenar.
Se utiliza una variable booleana asc para determinar si el orden es ascendente o descendente.
El ordenamiento se aplica sobre una copia filtrada de los datos antes de renderizar la tabla, garantizando que el orden afecte solo a la visualización actual.

El fragmento clave es:

if(sortKey){
  filtered.sort((a,b)=>{
    if(a[sortKey] > b[sortKey]) return asc ? 1 : -1;
    if(a[sortKey] < b[sortKey]) return asc ? -1 : 1;
    return 0;
  });
}

Esto permite que la tabla se ordene correctamente para cualquier columna, ya sea texto o números, manteniendo la lógica simple y eficiente.

Resultado

Gracias a esta implementación, el usuario puede ordenar los datos de manera interactiva y en tiempo real, mejorando la experiencia de uso y facilitando la exploración de la información.
