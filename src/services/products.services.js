const querys = require('../models/products.model');
const { validateLength, validateName, validateProductId, validateGetSales, getPutNameValidate,
  setUpdateProducts, getPutSaleValidate } = require('./validations/validationInput');

const getAllProducts = () => querys.findAll('products');

const getAllSales = () => querys.findAllSales('sales_products');

const getProductsById = async (id) => {
  const products = await querys.findById(id);
  return products;
};

const getSalesById = async (id) => {
  const [sales] = await querys.findIdSales(id);
  const error = validateGetSales(sales);
  if (error) return error;
  return sales;
};

const insertProducts = async (products) => {
  const errorName = validateName(products.name);
  const errorLength = validateLength(products.name);
  const table = 'products';
  if (errorLength.type) return errorLength;
  if (errorName.type) return errorName;

  const insertName = await querys.insert(products, table);
  if (insertName) return { type: null, message: insertName };
};

const insertSales = async (allProducts) => {
  const [productsId] = await querys.findAll('products');
  const valid = validateProductId(productsId, allProducts);
  if (valid.type) return valid;
  await querys.insert({ id: 3, date: new Date() }, 'sales');
  await querys.insertSalesProducts(allProducts);
  return { type: null, message: '' };
};

const updateProducts = async (product, id) => {
  const findId = await querys.findById(id);
  const validatePutName = getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await querys.update(product, id);
  
  return { type: null, message: 'Update Sucessful' };
};

const deleteProducts = async (id) => {
  const findId = await querys.findById(id);
  const validatePutName = getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await querys.remove(id);

  return { type: null, message: 'Update Sucessful' };
};

const deleteSales = async (id) => {
  const findId = await querys.findBySaleId(id);
  const validatePutName = getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await querys.removeSales(id);

  return { type: null, message: 'Update Sucessful' };
};

const updateSalesProducts = async (sales, id) => {
  const findId = await querys.findBySaleId(id);
  const validatePutName = getPutSaleValidate(findId);
  const setProducts = setUpdateProducts(sales);

  console.log('1 valid', validatePutName);
  console.log('2 valid', setProducts);
  if (validatePutName.type) return validatePutName;
  if (setProducts.type) return setProducts;

  console.log('entreiiiiis');
  if (sales.length >= 2) {
    await querys.updateSales(sales, id);
  }
  
  return { type: null, message: 'Update Sucessful' };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProducts,
  insertSales,
  getAllSales,
  getSalesById,
  updateProducts,
  deleteProducts,
  deleteSales,
  updateSalesProducts,
};