const modelProducts = require('../models/products.model');
const modelSales = require('../models/sales.model');
const getValidate = require('./validations/validationInput');

const getSalesById = async (id) => {
  const [sales] = await modelSales.findIdSales(id);
  const error = getValidate.validateGetSales(sales);
  if (error) return error;
  return sales;
};

const getAllSales = () => modelSales.findAllSales('sales_products');

const insertSales = async (allProducts) => {
  const [productsId] = await modelProducts.findAll('products');
  const valid = getValidate.validateProductId(productsId, allProducts);

  const lastSalesId = await modelProducts.findAll('sales');
  const newId = lastSalesId[lastSalesId.length - 1].id + 1;

  if (valid.type) return valid;
  const insertId = await modelProducts.insert({ id: newId, date: new Date() }, 'sales');
  await modelSales.insertSalesProducts(allProducts, insertId);
  return { type: null, message: insertId };
};

const deleteSales = async (id) => {
  const findId = await modelSales.findBySaleId(id);
  const validatePutName = getValidate.getPutNameValidate(findId);
  if (validatePutName.type) return validatePutName;
  await modelSales.removeSales(id);

  return { type: null, message: 'Update Sucessful' };
};

const updateSalesProducts = async (sales, id) => {
  const findId = await modelSales.findBySaleId(id);
  const validatePutName = getValidate.getPutSaleValidate(findId);
  const setProducts = getValidate.setUpdateProducts(sales);

  if (validatePutName.type) return validatePutName;
  if (setProducts.type) return setProducts;

  if (sales.length >= 2) {
    await modelSales.updateSales(sales, id);
  }
  
  return { type: null, message: 'Update Sucessful' };
};

module.exports = {
  insertSales,
  getSalesById,
  deleteSales,
  updateSalesProducts,
  getAllSales,
};
