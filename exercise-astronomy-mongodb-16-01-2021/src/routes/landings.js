const route = require('express').Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const Landings = require('../models/Landings');

// Endpoints relativos a Landings

// Recuperamos name, mass y year. Filtramos por ?from=2005&to=2010
// req.query = {
//   from: 2005,
//   to: 2010
// }
route.get('/', [isAuthenticated], async (req, res, next) => {
  try {
    const from = req.query.from;
    const to = req.query.to;

    const landings = await Landings.find(
      {
        year: {
          $gte: from,
          $lte: to,
        },
      },
      // Recupero solamente estos campos de los landings
      {
        name: 1,
        mass: 1,
        year: 1,
      }
    );

    res.status(200).json({
      data: landings,
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: err,
      ok: false,
    });
  }
});

module.exports = route;
