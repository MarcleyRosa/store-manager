const express = require('express');
const { controllerPostSales } = require('../controllers/products.controller');
const { validateQuantity, validateProductId } = require('../middlewares/validate');

const router = express.Router();

router.post('/', validateProductId, validateQuantity, controllerPostSales);

module.exports = router;