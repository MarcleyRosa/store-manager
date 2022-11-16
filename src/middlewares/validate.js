const { productId, quantity, putName } = require('./schema');

const validateProductId = (req, res, next) => {
  const salesProducts = req.body;

  let isError;
  salesProducts.forEach((element) => {
    const { error } = productId.validate(element.productId);
    if (error) isError = error;
  });
  if (isError) return res.status(400).json({ message: '"productId" is required' });
  return next();
};

const validateQuantity = (req, res, next) => {
  const salesProducts = req.body;

   let isError;
    salesProducts.forEach((element) => {
    const { error } = quantity.validate(element.quantity);
      isError = error;
    });
  if (isError) {
  const resError = isError.details[0].type;
  const messageError = resError === 'number.min' ? '"quantity" must be greater than or equal to 1'
  : '"quantity" is required';
  const status = resError === 'number.min' ? 422 : 400;
    return res.status(status).json({ message: messageError });
  } 
  return next();
};

const validatePutName = (req, res, next) => {
  const { name } = req.body;

  const { error } = putName.validate(name);
 
  if (error) {
    const typeError = error.details[0].type;
    console.log(typeError);
    const messageError = typeError === 'string.min'
    ? '"name" length must be at least 5 characters long'
  : '"name" is required';
  const status = typeError === 'string.min' ? 422 : 400;
    return res.status(status).json({ message: messageError });
  } 
  return next();
};

module.exports = {
  validateProductId,
  validateQuantity,
  validatePutName,
};