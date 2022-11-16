const express = require('express');
const { controllerPostSales, controllerGetSales,
  controllerGetSalesById, contollerDeleteSales } = require('../controllers/products.controller');
const { validateQuantity, validateProductId } = require('../middlewares/validate');

const router = express.Router();

router.post('/', validateProductId, validateQuantity, controllerPostSales);

router.get('/', controllerGetSales);

router.get('/:id', controllerGetSalesById);

router.delete('/:id', contollerDeleteSales);

module.exports = router;