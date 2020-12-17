const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});
