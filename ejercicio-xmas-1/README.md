# Ejercicio 1 - Xmas Edition

Ahora que se acercan las navidades vamos a tener que hacer un ejercicio con `Node` y `Express` para ayuda a `Santa Claus` a organizar los regalos para un listado de niños que han enviado su carta a última hora 🎅🏼

En este caso, partiremos de una lista de niños y los regalos que han pedido por navidades dentro de un archivo `JSON` que encontraremos en la carpeta `db` bajo el nombre `wishes.json`.

Adicionalmente dispondremos de dos listados más, uno contendrá una puntuación de comportamiento anual para cada niño de la lista de deseos (llamado `scores.json`), y otro contendrá una lista de precios para los regalos que tendremos que utilizar de forma adecuada para llevar el mayor número de regalos posibles a cada persona (llamado `prices.json`).

Usando toda esta información, vamos a contruir la siguiente API para Santa siguiendo estos pasos:

1. Crearemos un `router` llamado `wishes` a través del cual podremos obtener, mediante un endpoint de tipo `GET`, el listado de niños y los deseos han pedido por navidad.

2. En el mismo router, crearemos otro endpoint `GET` que permita obtener un niño utilizando su nombre como parámetro (usar route param `/:name`). Debe funcionar independientemente del casing del nombre y si contiene o no espacios (`MoLPe` debe funcionar).

3. Ahora crea un nuevo `router` llamado `scores` que contenga un ruta de tipo `GET` para obtener un listado completo de todas las puntuaciones anuales disponibles.

4. Crea también un endpoint para obtener la puntuación de una sola persona dado su nombre (debe funcionar independientemente del casing).

5. Ahora vamos a modificar el endpoint del punto 1 para añadir, a traves de `search params` la posibilidad de filtrar por regalo el listado de personas. Si enviamos `present=motorbike` solamente devolverá un listado con los niños que han pedido una moto por navidades.

6. Modificaremos también el endpoint del punto 3 para añadir un `search param` que nos permita filtra todos los niños que hayan obtenido una puntuación superior a la cantidad que enviemos estas navidades. (`score=6` traerá un listado con los que haya obtenido más de 6 puntos).

7. Modificaremos el endpoint creado en el punto 2 para obtener, junto con los datos originales, el `score` asignado a dicha persona, de forma que si pedimos `/molpe` obtenedremos:

```
{
  "name": "Molpe",
  "presents": ["coffee", "videogames"],
  "score": 2.3
}
```

**¡A partir de ahora vamos a comenzar a escribir y modificar la información que tenemos almacenada! 🚀**

8. Ahora que Santa Claus puede visualizar la información inicial y se hace una idea de los regalos que quiere entregar, debe crear un listado de regalos finales para cada niño acorde al precio total y su nota. Crearemos un endpoint de tipo `POST` en la ruta `presents` que cree un nuevo archivo en la carpeta `db` llamado `presents.json` y contenga un array de objetos igual que el original de `wishes.json`, pero con todos los arrays de regalos como arrays vacíos, de forma que únicamente dispongamos del nombre de cada niño en el array de objetos.

9. Crearemos ahora un endpoint de tipo `PUT` que reciba como parámetro en la URL `/:name`. Este endpoint realizará el siguiente cálculo:

- Buscará al niño correspondiente en el archivo `presents`.
- Buscará al niño correspondiente en el arhivo `wishes`.
- Buscará la puntuación del niño correspondiente en el archivo `scores`.
- Realizará un pequeño cálculo de forma que, los niños con más de `7` puntos anuales asignados, recibirán todos los regalos que han pedido por navidad. Los que hayan obtenido entre `5` y `7` puntos, recibirá adicionalmente carbón `coal` en el array de regalos. Aquellos que hayan obtenido menos de `5` puntos perderán el regalo de la posición `[1]` de su array original de regalos y lo cambiarán por `coal` (carbón).
- Guardaremos entonces los regalos en el archivo `presents.json`.

* ¡Invoca el endpoint tantas veces como sea necesario para poder procesar los regalos de cada niño!

10. ¡Santa Claus tiene todo listo para llevar los regalos! Pero acaba de darse cuenta de que tiene un límite de dinero para gastar 💸 y tiene que administrar correctamente lo que gasta por niño. Vamos a crear otro endpoint de tipo `PUT` que recibirá un parámetro `/:name` a través del cual haremos el siguiente cálculo:

- Buscará al niño correspondiente en el archivo `presents`.
- Buscará la puntuación del niño correspondiente en el archivo `scores`.
- Buscará los regalos correspondiente de cada niño en `prices`.
- Realizará un pequeño cálculo de forma que, los niños con más de `8` puntos anuales puedan gasta hasta `7000` euros en regalos de navidad. Los niños que tengan entre `5` y `8` puntos podrán gastar hasta `2000` euros en regalos de navidad. Los niños que tengan menos de `5` puntos podrán gastar únicamente `300` euros en regalos de navidad. Utilizando estas condiciones, eliminaremos del array de regalos tantos elementos como sea posible para conseguir acercarnos lo más que podamos a esa cantidad eliminando el menor número de regalos posible en el proceso.
- Guardaremos entonces los regalos en el archivo `presents.json`.

* ¡Invoca el endpoint tantas veces como sea necesario para poder procesar los regalos de cada niño!

11. ¡Ahora si que lo tenemos! ¡Santa va a poder repartir los regalos de navidad a todos los niños que han pedido sus regalos! Por último, crea un endpoint para recoger todos niños y los regalos `presents` que vamos a poder enviar esta navidad. 🎄

### Bonus:

¡Acabamos de recibir noticias de que algunos de los niños no han programado nada estas vacaciones! Vamos a modificar la lista de regalos lo antes posible para no equivocarnos al llevarlos:

- Crea un endpoint de tipo `DELETE` que permita borrar del archivo `presents.json` a los niños dado su `/:name`. Tras esto, elimina a `Molpe` y `Fernando`. Ya que se habrán quedado sin regalos de navidad por su mal comportamiento.

- Crea un endpoint de tipo `PUT` que permita añadir `coal` o `socks` a los niños de `presents.json` dado su `/:name` (el regalo se enviará en el `body` en un campo `present`). Envía carbón adicional a `Zineb`, `Dani` y `Silvia`. Envía calcetines al resto de niños que quedan sin modificar 🧦.

**¡Felcidades! ¡Ya has terminado el ejercicio 1 de estas navidades!🦄🔥**
