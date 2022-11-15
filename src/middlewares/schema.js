const Joi = require('joi');

const productId = Joi.number().required();
const quantity = Joi.number().min(1).required();

module.exports = {
  productId,
  quantity,
};