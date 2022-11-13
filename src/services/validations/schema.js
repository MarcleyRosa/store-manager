const Joi = require('joi');

const isName = Joi.string().required();
const lengthName = Joi.string().min(5);

module.exports = {
  isName,
  lengthName,
};