// const { format, isExists, isAfter, addDays, addYears, startOfDay, getUnixTime, fromUnixTime } = require('date-fns')
const format = require('date-fns/format')
const isExists = require('date-fns/isExists')
const isAfter = require('date-fns/isAfter')
const addDays = require('date-fns/addDays')
const addMonths = require('date-fns/addMonths')
const addYears = require('date-fns/addYears')
const getUnixTime = require('date-fns/getUnixTime')
const fromUnixTime = require('date-fns/fromUnixTime')
const formatDistanceStrict = require('date-fns/formatDistanceStrict')
const isWeekend = require('date-fns/isWeekend')
const differenceInDays = require('date-fns/differenceInDays')
const isWithinInterval = require('date-fns/isWithinInterval')
const { formatDistance } = require('date-fns')
const esLocale = require('date-fns/locale/es')

/* 
Para poder contratar el seguro de un auto, el usuario debe rellenar distintos campos, entre ellos, la fecha de contratación que almacenaremos en la variable inputDate. 

La compañía aseguradora pone ciertas condiciones para poder realizar correctamente esta transacción

a. El dato ingresado debe ser una fecha válida
b. La fecha debe ser posterior a la fecha del día actual
c. La fecha debe ser un día comprendido entre lunes y viernes
d. La fecha no debe superar los 3 meses desde el día 

Además, para emitir el comprobante de contratación vamos a necesitar calcular las siguientes fechas:

e. El servicio tiene una fecha de caducidad a los dos años de la fecha de contratación. Dicha fecha la calcularemos y almacenaremos en la variable expirationDate
f. El primer cobro del servicio se hará 5 días después de la fecha de inicio (hiringDate) 
g. Para informar al usuario mes a mes necesitaremos una función que calcule hace cuánto tiempo contratamos el servicio.
*/


const inputDate = '2021-01-24'
console.log(`Selected hiring date ${inputDate}`)

// !!! Para algunos métodos de Date-fns necesitaremos el año, día y mes por separado
const year = Number(inputDate.split('-')[0])
const month = Number(inputDate.split('-')[1])
const day = Number(inputDate.split('-')[2])

const hiringDate = new Date(year, month - 1, day)


console.log(`
    year: ${year}
    month: ${month}
    day: ${day}
`)


// Preparamos una función auxiliar que nos permita convertir cualquier fecha en el formato final que queramos, por ejemplo dia/mes/año



// a. Para comprobar que sea una fecha válida ---> isExists requiere 3 argumentos de tipo número

const isValid = isExists(year, month, day)
console.log("Es una fecha válida", isValid)

// b. Para comprobar que la fecha sea posterior al día en el que se está contratando

const today = new Date()
console.log('Fecha de hoy', today)

const isAfterToday = isAfter(hiringDate, today)
console.log("Es una fecha posterior a hoy", isAfterToday)

// c. Para comprobar que la fecha no sea sábado ni domingo

const isWeekDay = !isWeekend(hiringDate)
console.log('Es dia de semana', isWeekDay)


// d. Para comprobar que la fecha no es mayor a 3 meses desde el día de hoy

const differenceInDaysDate = differenceInDays(hiringDate, today) <= 90
console.log('Esta dentro de los proximos 3 meses', differenceInDaysDate)


const todayPlusThreeMonths = addMonths(today, 3)
const isWithinThreeMonths = isWithinInterval(hiringDate, { start: today, end: todayPlusThreeMonths })

console.log("Esta dentro de los proximos 3 meses version 2", isWithinThreeMonths)

// e. Para establecer la fecha de expiración del servicio agregamos dos años a hiringDate

const expirationDate = addYears(hiringDate, 2)
console.log("Expiration Date", expirationDate)

// f. Para calcular el primer cobro del servicio, agregamos 5 días a la fecha de contratación

const firstPaymentDate = addDays(hiringDate, 5)
console.log("First Payment Day", firstPaymentDate)

// Obtenemos en "lenguaje humano" hace cuánto tiempo fue contratado el servicio

const extraMessageDay = formatDistanceStrict(today, hiringDate, { unit: 'day', roundingMethod: 'ceil', locale: esLocale })
console.log('Message:', extraMessageDay)

const extraMessageMinutes = formatDistance(today, hiringDate, { unit: 'month', includeSeconds: true, addSuffix: true })
console.log('MessageMinutes', extraMessageMinutes)
// Datos finales

const convertDate = (date) => format(date, 'yyyy/MM/dd')


const finalData = () => isValid && isAfterToday && isWeekDay && isWithinThreeMonths ?
    {
        today: convertDate(today),
        hiringDate: convertDate(hiringDate),
        expirationDate: convertDate(expirationDate),
        firstPaymentDate: convertDate(firstPaymentDate),
        message: `Usuario dado de alta desde hace ${extraMessageDay}`,
    } : null

console.log('Estos serán los datos finales que enviaremos al front', finalData())



// Extras
// Time Stamp
const date = new Date()
const tokenExpirationDate = addYears(date, 1)
const expirationTimeStamp = getUnixTime(tokenExpirationDate)

console.log('expiration time stamp', expirationTimeStamp)
console.log('expiration time stamp converted to date', fromUnixTime(expirationTimeStamp))

