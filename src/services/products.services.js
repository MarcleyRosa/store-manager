const modelProducts = require('../models/products.model');
const getValidate = require('./validations/validationInput');

const getAllProducts = () => modelProducts.findAll('products');

const getProductsById = async (id) => {
  const products = await modelProducts.findById(id);
  return products;
};

const insertProducts = async (products) => {
  const errorName = getValidate.validateName(products.name);
  const errorLength = getValidate.validateLength(products.name);
  const table = 'products';
  if (errorLength.type) return errorLength;
  if (errorName.type) return errorName;

  const insertName = await modelProducts.insert(products, table);
  if (insertName) return { type: null, message: insertName };
};

const updateProducts = async (product, id) => {
  const findId = await modelProducts.findById(id);
  const validatePutName = getValidate.getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await modelProducts.update(product, id);
  
  return { type: null, message: 'Update Sucessful' };
};

const deleteProducts = async (id) => {
  const findId = await modelProducts.findById(id);
  const validatePutName = getValidate.getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await modelProducts.remove(id);

  return { type: null, message: 'Update Sucessful' };
};

const searchProduct = async (q) => {
  const [findAllPrducts] = await modelProducts.findAll('products');
  if (q) {
    return findAllPrducts.filter((product) => product.name.includes(q));
  }
  if (!q.length) return findAllPrducts;
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProducts,
  updateProducts,
  deleteProducts,
  searchProduct,
};