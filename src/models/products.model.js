const snakeize = require('snakeize');
const connection = require('../db/connection');

const findAll = async (table) => connection.execute(
    `SELECT * FROM StoreManager.${table};`,
);

const findById = async (id) => {
  const [[selectId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return selectId;
};

const insert = async (products, table) => {
  const columns = Object.keys(snakeize(products))
    .map((key) => `${key}`)
    .join(',');

  const placeholders = Object.keys(products)
    .map((_key) => '?')
    .join(',');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.${table} (${columns}) VALUE (${placeholders})`,
    [...Object.values(products)],
  );

  return insertId;
};

const update = (product, id) => connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [product, id],
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