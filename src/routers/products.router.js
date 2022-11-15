const express = require('express');
const { routerAllProducts, routerProductsById,
  routerPostProducts } = require('../controllers/products.controller');

const router = express.Router();

router.get('/', routerAllProducts);

router.get('/:id', routerProductsById);

router.post('/', routerPostProducts);

module.exports = router;