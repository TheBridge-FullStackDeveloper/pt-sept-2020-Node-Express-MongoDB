// Aquí configuración de conexión a la base de datos
// ...

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!')
    process.exit(0)
  })
})