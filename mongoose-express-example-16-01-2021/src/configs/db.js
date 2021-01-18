const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.info('> succesfully connected to mongoDB'))
  .catch(error => {
    console.error('> error trying to connect to mongoDB: ', error.message)
    process.exit(0)
  })

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!')
    process.exit(0)
  })
})