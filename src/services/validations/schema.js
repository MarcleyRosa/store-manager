const Joi = require('joi');

const isName = Joi.string().required();
const lengthName = Joi.string().min(5);
const salesProduct = Joi.object().required();
const isProduct = Joi.number().required();

module.exports = {
  isName,
  lengthName,
  salesProduct,
  isProduct,
};