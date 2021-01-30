1. Creamos un package.json con `npm init -y`
2. Creamos un README.md con `touch README.md`
3. Añadimos un main `"main": "src/app.js"`, y creamos una carpeta src que contenga nuestro proyecto. El archivo app.js será el punto de entrada.
4. Instalamos las dependecias `npm i express mongoose` y las dependencias de desarrollo `npm i -D nodemon`
5. Creamos un archivo `.prettierrc` que servirá de base para el formateo de datos.
6. Añadimos un script de desarrollo `"dev": "nodemon ."`
7. Planteamos los modelos User y Tweet.
8. Creamos el modelo Tweet (añadimos `timestamps: true` para tener fechas de creación y update)
9. Añadimos el archivo `db.js` para conectarnos a la base de datos.
10. Creamos un archivo `app.js` y configuramos para lanzar un server en localhost 3000.

## Parte 2, enrutado y lógica de negocio

1. Crear una carpeta `/routes` que contenga un index (que exporta todas las rutas) y cada archivo de ruta por separado (`user.routes.js` & `tweet.routes.js`).
2. Añadir el enrutador en `app.js`
3. Como para tener tweets necesitamos users, vamos a trabajar sobre `user.routes.js`. Crearemos al menos un POST (para crear users) y un GET para recoger todos los users.
4. Como vamos a simular un registro en el POST, vamos a usar bcrypt (npm i bcrypt) para hashear la contraseña.

5. Una vez conseguido lo anterior, vamos a crear un endpoint PUT para añadir un follower al array de otro usuario, y un follow al array del usuario inicial.

## Parte 3, creación de tweets

1. Crear un POST en el `tweet.routes.js` que permita crear un tweet por parte de un usuario
2. Un endpoint GET para recoger los tweets ordenados por fecha (más reciente primero, o descendente).
3. Vamos a popular los tweets de un user mediante `.populate()`

```
Opciones que podemos usar en el .populate():

interface PopulateOptions {
  /** space delimited path(s) to populate */
  path: string;
  /** fields to select */
  select?: any;
  /** query conditions to match */
  match?: any;
  /** optional model to use for population */
  model?: string | Model<any>;
  /** optional query options like sort, limit, etc */
  options?: any;
  /** deep populate */
  populate?: PopulateOptions | Array<PopulateOptions>;
  /**
    * If true Mongoose will always set `path` to an array, if false Mongoose will
    * always set `path` to a document. Inferred from schema by default.
    */
  justOne?: boolean;
}
```
