const express = require('express');
const { routerAllProducts, routerProductsById,
  routerPostProducts, controllerPutProductId } = require('../controllers/products.controller');
const { validatePutName } = require('../middlewares/validate');

const router = express.Router();

router.get('/', routerAllProducts);

router.get('/:id', routerProductsById);

router.put('/:id', validatePutName, controllerPutProductId);

router.post('/', routerPostProducts);

module.exports = router;