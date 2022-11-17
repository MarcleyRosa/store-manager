const { isName, lengthName, salesProduct, isProduct } = require('./schema');

const validateName = (name) => {
  const { error } = isName.validate(name);

  if (error) return { type: '400', message: '"name" is required' };

  return { type: null, message: '' };
};

const validateLength = (name) => {
  const { error } = lengthName.validate(name);

  if (error) {
 return {
    type: '422',
    message: '"name" length must be at least 5 characters long',
  }; 
}

   return { type: null, message: '' };
};

const validateGetSales = (array) => {
  if (!array.length) return { type: '404', message: 'Sale not found' };

    return { type: null, message: array };
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

const getPutNameValidate = (name) => {
  const { error } = salesProduct.validate(name);
  if (error) return { type: '404', message: 'Product not found' };
  return { type: null, message: 'sucessfull' };
};

const getPutSaleValidate = (name) => {
  const { error } = salesProduct.validate(name);
  if (error) return { type: '404', message: 'Sale not found' };
  return { type: null, message: 'sucessfull' };
};

const setUpdateProducts = (productsBody) => {
    let isError = false;
  productsBody.forEach((element) => {
    const { error } = isProduct.validate(element);
    if (error) {
      isError = error;
  }
    });
  
  //     let isError = false;
  //   productsBody.forEach((element) => {
  //     const products = productsDB.some((elem) => elem.productId === element.product_id);
  //     console.log('for each', products);
  //   if (!products) {
  //     isError = true;
  // }
  // });
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
  validateGetSales,
  getPutNameValidate,
  getPutSaleValidate,
  setUpdateProducts,
};