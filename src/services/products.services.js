const querys = require('../models/products.model');

const getAllProducts = () => querys.findAll();

const getProductsById = async (id) => {
  const products = await querys.findById(id);
  return products;
};

const insertProducts = async (products) => querys.insert(products);

module.exports = {
  getAllProducts,
  getProductsById,
  insertProducts,
};