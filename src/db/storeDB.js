const connection = require('./connection');

const findAll = async () => connection.execute(
    'SELECT * FROM StoreManager.products;',
);

const findById = (id) => connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
);

module.exports = {
  findAll,
  findById,
};