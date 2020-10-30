const { Router } = require('express');

const CustomerController = require('../controllers/CustomerController');
const { auth } = require('../middlewares/auth');
const validation = require('../middlewares/validation');

const router = Router();

router.get('/', CustomerController.get);
router.post('/', validation, CustomerController.post);
router.put('/:id', auth, validation, CustomerController.put);
router.put('/changePassword/:id', auth, CustomerController.changePassword);
router.post('/auth', CustomerController.login);

module.exports = router;
