# Inicio básico
- Lee este README bien!
- Haz FORK del proyecto!
- Haz CLONE del proyecto después del FORK
- Clónalo y a disfrutar!

# Inicio del proyecto
- Una vez clonado, ve a la carpeta (en tu terminal) donde se encuentra el fichero package.json
- Ejecuta el comando
```bash
npm i
```
Esto te instalará todas las dependencias que necesitas
- Cuando haya terminado, ejecuta en la terminal
```bash
npm run dev
```
Esto lanzará el comando que hay en el fichero package.json relativo a 'dev' en la sección de 'scripts' (ejecutará el fichero index.js a través de nodemon, que es un servicio que escucha cambios en los ficheros y reinicia el servidor para que no tengas que hacerlo tú)

# Crea tu propia API de cervezas!
Este proyecto tiene lo más básico para que pueda funcionar. Simplemente es un servidor que no hace nada. Deberás darle esas funcionalidades creando los servicios que necesites.

La idea de este proyecto es que sustituyas, en el ejercicio que hicisteis de las cervezas, todas las llamadas a la punkAPI por llamadas a vuestros propios servicios. Tenéis toda la información de las cervezas que provee la API en 'src/db/beers.json'. Recordad que antes de cambiar contenido en el front tenéis que probar que todos los servicios funcionan desde Postman!

Tenéis comentarios en aquellos ficheros donde tenéis que añadir cosas. Solo os tenéis que preocupar de crear los servicios y de requerirlos donde sean necesarios (usad de orientación los ejercicios de esta semana)

# TODO!
- Servicio para obtener un listado de cervezas (las primeras 25)
- Servicio para obtener una cerveza determinada en función de su id
- Servicio para obtener una cerveza aleatoria
- Servicio para obtener un número determinado de cervezas en una página determinada

EXTRA: devuelve en la respuesta de esta petición una propiedad “next” cuyo valor será la siguiente url a la que hacer la petición. Si no hubiera más este campo debería ser null o no existir (así sabremos si no quedan más cervezas)

SÚPER-EXTRA: Servicio para añadir una cerveza nueva (sin foto, por ahora). Comprueba, además que el usuario no pueda meter los campos que quiera (no hace falta que hagas una versión completa de una cerveza. Puede tener unos pocos campos, pero éstos tienen que ser obligatorios y si el usuario no los introduce deberá ser devuelto un error)

Recordad que las respuestas de vuestros servicios deberán ser JSON y mandar el status (código http)!