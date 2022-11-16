const Joi = require('joi');

const productId = Joi.number().required();
const quantity = Joi.number().min(1).required();
const putName = Joi.string().required().min(5);

module.exports = {
  productId,
  quantity,
  putName,
};