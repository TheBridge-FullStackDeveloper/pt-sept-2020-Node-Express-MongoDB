const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/express-auth'
mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`Connected to database: ${DB_URI}`)
  })
  .catch((err) => {
    console.log('Error connecting to database')
    console.log(err)
  })
