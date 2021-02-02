const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/bridge-sn';

mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to database: ${DB_URI}`);
  })
  .catch((err) => {
    console.log('Error connecting to database');
    console.log(err);
  });
