const express = require('express');

const beers = require('../db/beers.json');

const router = express.Router();

const BEERS_PER_PAGE = 25;
const getPages = (totalBeers, amountPerPage) => Math.floor(totalBeers.length / amountPerPage);
const getAsNumber = (value, defaultValue) => {
  const valueAsNumber = Number(value);
  return Number.isNaN(valueAsNumber) || valueAsNumber <= 0 ? defaultValue : valueAsNumber;
};

// REQ QUERY  => query/search params ?page=1&amount=10
// REQ PARAMS => url params /:id
router.get('/', (req, res, next) => {
  try {
    const { page, amount } = req.query;
    const reqPage = getAsNumber(page, 1);
    const reqAmount = getAsNumber(amount, BEERS_PER_PAGE);

    const startIndex = reqPage * reqAmount - reqAmount;
    const endIndex = reqPage * reqAmount;
    const beersSlice = beers.slice(startIndex, endIndex);

    // En un server con DB sacaría las cervezas en una query y las pasaría a la función
    const pages = getPages(beers, reqAmount);
    const nextPage = reqPage + 1 > pages ? null : reqPage + 1;

    return res.status(200).json({
      data: {
        beers: beersSlice,
        total: beersSlice.length,
      },
      status: 'ok',
      next: `http://${req.headers.host}/beers?page=${nextPage}&amount=${reqAmount}`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
