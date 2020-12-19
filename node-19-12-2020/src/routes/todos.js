const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    data: [
      {
        id: 1,
        title: 'Hacer la cena',
        category: 'Alimentación',
        description: 'Quiero comer curry'
      }
    ]
  });
});

module.exports = router;
