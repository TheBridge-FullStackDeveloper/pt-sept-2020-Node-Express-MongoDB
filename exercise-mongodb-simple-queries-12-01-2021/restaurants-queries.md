## Importa la colección restaurants en la base de datos simple-queries-exercise a través del comando:

```js
mongoimport --db {dbName} --collection {collectionName} --file {filaName}.json
```

## Ejercicio

1- Muestra todos los restaurantes

2- Muestra todos los restaurantes en el barrio de Manhattan

3- Muestra todos los restaurantes en los barrios de Queens y Brooklyn

4- Muestra todos los restaurantes de comida americana

5- Muestra todos los restaurantes de comida americana en el barrio de Queens

6- Muestra solo los nombres de los restaurantes de comida Jewish/Kosher

7- Muestra solo los 10 primeros restaurantes

8- Muestra todos los restaurantes cuyo código postal sea 11374

9- Muestra todos los restaurantes que tengan grado A y dos puntuaciones (scores = 2)

10- Muestra los nombres y el código postal de todos los restaurantes cuyo código postal sea inferior a 10500 y ordenados de mayor a menor (por código postal)