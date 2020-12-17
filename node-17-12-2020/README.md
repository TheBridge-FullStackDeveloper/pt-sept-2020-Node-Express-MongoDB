# TODO BRIDGE

Dada la lista de `categories` y `todos` que tenemos, vamos a crear un servidor que cumpla los siguientes requisitos para terminar nuestra Todo List:

* Crear un endpoint `GET` que traiga todos los `todos` que tenga el servidor. Este enpoint limitará por defecto a 5 los todos que estamos recogiendo.

* Crear un endpoint `GET` que traiga un solo `todo` dada su `:id`.

* Modificar los endpoints anteriores para que los todos que estamos trayendo tengan un campo `category` con la información de la categoría que tengan asignada.

* Crear un endpoint de tipo `POST` que usando `req.body` reciba los campos necesarios para crear un nuevo `todo`, escribiéndolo en el archivo `todos.json`.

- Crea al menos 5 `todos` nuevos usando este endpoint.

* Modifica el endpoint inicial que trae todos los `todos` para gestionarlos por páginas (diviendo cada página por cada 5 `todos`), esto lo haremos usando `req.query`.

* Añadir un endpoint `POST` que me permita añadir nuevas `categories` al array de categorías.

- Crea al menos 2 `todos` usando categorías nuevas.

* Modifica el primer endpoint para que pueda recibir un `search param` llamado `category` que permita filtrar todos los `todos` de la categoría que pedimos. Este campo `category` será un número con la id de la categoría que buscamos.