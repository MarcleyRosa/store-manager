const { isName, lengthName } = require('./schema');

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

module.exports = {
  validateLength,
  validateName,
};