const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {

  return res.json({ message: 'Hello World' });

});

module.exports = router;
