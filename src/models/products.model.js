const snakeize = require('snakeize');
const connection = require('../db/connection');

const findAll = async (table) => connection.execute(
    `SELECT * FROM StoreManager.${table};`,
);

const findAllSales = async () => {
  const returnAll = connection.execute(
    `SELECT sale_id AS saleId, product_id AS productId, quantity,
    date FROM StoreManager.sales_products AS p
    INNER JOIN StoreManager.sales AS s ON p.sale_id = s.id;`,
);
  return returnAll;
};

const findIdSales = async (id) => connection.execute(
  `SELECT product_id AS productId, quantity, date FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales WHERE sale_id = ?
  ORDER BY product_id, quantity LIMIT 2 OFFSET 1;;`, [id],
);

const findById = async (id) => {
  const [[selectId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return selectId;
};

const findBySaleId = async (id) => {
  const [[selectId]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
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
const insertSalesProducts = async (products, id) => {
  const returnInsert = await Promise.all(products.map((product) => connection.execute(
    `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [id, product.productId, product.quantity],
  )));
  return returnInsert;
};

const update = (product, id) => connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [product, id],
);

const updateSales = async (quant, id) => connection.execute(
`UPDATE StoreManager.sales_products SET quantity = (
  CASE product_id WHEN 1 THEN ? WHEN 2 THEN ? ELSE product_id END)
  WHERE sale_id = ?;`,
    [quant[0].quantity, quant[1].quantity, id],
  );

const remove = (id) => connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
);
const removeSales = (id) => connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  insertSalesProducts,
  findIdSales,
  findAllSales,
  findBySaleId,
  removeSales,
  updateSales,
};