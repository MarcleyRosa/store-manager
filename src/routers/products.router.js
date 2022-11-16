const express = require('express');
const { routerAllProducts, routerProductsById, routerPostProducts,
  controllerPutProductId, contollerDeleteProduct } = require('../controllers/products.controller');
const { validatePutName } = require('../middlewares/validate');

const router = express.Router();

router.get('/', routerAllProducts);

router.get('/:id', routerProductsById);

router.put('/:id', validatePutName, controllerPutProductId);

router.delete('/:id', contollerDeleteProduct);

router.post('/', routerPostProducts);

module.exports = router;