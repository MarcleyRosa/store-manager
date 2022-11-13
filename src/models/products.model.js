const connection = require('../db/connection');

const findAll = async () => connection.execute(
    'SELECT * FROM StoreManager.products;',
);

const findById = (id) => connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
);

const insert = (products) => connection.execute(
    `INSERT INTO StoreManager.products
    (id, name) VALUES (?, ?)`,
     [products.id, products.name],
);

const update = (products, id) => connection.execute(
    'UPDATE StoreManager.products SET nome = ? WHERE id = ?',
    [products.name, id],
);

const remove = (id) => connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};