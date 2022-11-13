const querys = require('../models/products.model');
const { validateLength, validateName } = require('./validations/validationInput');

const getAllProducts = () => querys.findAll();

const getProductsById = async (id) => {
  const products = await querys.findById(id);
  return products;
};

const insertProducts = async (products) => {
  const errorName = validateName(products.name);
  const errorLength = validateLength(products.name);
  if (errorLength.type) return errorLength;
  if (errorName.type) return errorName;

  const insertName = await querys.insert(products);
  if (insertName) return { type: null, message: insertName };
  return { type: 'Name is required', message: 'Name is not found' };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProducts,
};