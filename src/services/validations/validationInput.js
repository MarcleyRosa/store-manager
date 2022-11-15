const { isName, lengthName } = require('./schema');

const validateName = (name) => {
  const { error } = isName.validate(name);
  console.log(error);

  if (error) return { type: '400', message: '"name" is required' };

  return { type: null, message: '' };
};

const validateLength = (name) => {
  const { error } = lengthName.validate(name);
  // console.log(error.details[0].type);

  if (error) {
 return {
    type: '422',
    message: '"name" length must be at least 5 characters long',
  }; 
}

   return { type: null, message: '' };
};

const validateProductId = (allProducts, salesArray = []) => {
  let isError = false;
  salesArray.forEach((element) => {
    const products = allProducts.some((elem) => elem.id === element.productId);
    if (!products) {
      isError = true;
  }
  });
  if (isError) {
 return {
      type: '404',
      message: 'Product not found',
    }; 
}
  return { type: null, message: '' };
};

module.exports = {
  validateLength,
  validateName,
  validateProductId,
};