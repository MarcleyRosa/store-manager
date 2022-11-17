const querys = require('../models/products.model');
const getValidate = require('./validations/validationInput');

const getAllProducts = () => querys.findAll('products');

const getAllSales = () => querys.findAllSales('sales_products');

const getProductsById = async (id) => {
  const products = await querys.findById(id);
  return products;
};

const getSalesById = async (id) => {
  const [sales] = await querys.findIdSales(id);
  const error = getValidate.validateGetSales(sales);
  if (error) return error;
  return sales;
};

const insertProducts = async (products) => {
  const errorName = getValidate.validateName(products.name);
  const errorLength = getValidate.validateLength(products.name);
  const table = 'products';
  if (errorLength.type) return errorLength;
  if (errorName.type) return errorName;

  const insertName = await querys.insert(products, table);
  if (insertName) return { type: null, message: insertName };
};

const insertSales = async (allProducts) => {
  const [productsId] = await querys.findAll('products');
  const valid = getValidate.validateProductId(productsId, allProducts);

  const lastSalesId = await querys.findAll('sales');
  const newId = lastSalesId[lastSalesId.length - 1].id + 1;

  if (valid.type) return valid;
  const insertId = await querys.insert({ id: newId, date: new Date() }, 'sales');
  await querys.insertSalesProducts(allProducts, insertId);
  return { type: null, message: insertId };
};

const updateProducts = async (product, id) => {
  const findId = await querys.findById(id);
  const validatePutName = getValidate.getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await querys.update(product, id);
  
  return { type: null, message: 'Update Sucessful' };
};

const deleteProducts = async (id) => {
  const findId = await querys.findById(id);
  const validatePutName = getValidate.getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await querys.remove(id);

  return { type: null, message: 'Update Sucessful' };
};

const deleteSales = async (id) => {
  const findId = await querys.findBySaleId(id);
  const validatePutName = getValidate.getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await querys.removeSales(id);

  return { type: null, message: 'Update Sucessful' };
};

const updateSalesProducts = async (sales, id) => {
  const findId = await querys.findBySaleId(id);
  const validatePutName = getValidate.getPutSaleValidate(findId);
  const setProducts = getValidate.setUpdateProducts(sales);

  if (validatePutName.type) return validatePutName;
  if (setProducts.type) return setProducts;

  if (sales.length >= 2) {
    await querys.updateSales(sales, id);
  }
  
  return { type: null, message: 'Update Sucessful' };
};

const searchProduct = async (q) => {
  const [findAllPrducts] = await querys.findAll('products');
  if (q) {
    return findAllPrducts.filter((product) => product.name.includes(q));
  }
  if (!q.length) return findAllPrducts;
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
  searchProduct,
};