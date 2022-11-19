const connection = require('../db/connection');

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

const findBySaleId = async (id) => {
  const [[selectId]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return selectId;
};

const insertSalesProducts = async (products, id) => {
  const returnInsert = await Promise.all(products.map((product) => connection.execute(
    `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [id, product.productId, product.quantity],
  )));
  return returnInsert;
};

const updateSales = async (quant, id) => connection.execute(
`UPDATE StoreManager.sales_products SET quantity = (
  CASE product_id WHEN 1 THEN ? WHEN 2 THEN ? ELSE product_id END)
  WHERE sale_id = ?;`,
    [quant[0].quantity, quant[1].quantity, id],
);

const removeSales = (id) => connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
);

module.exports = {
  insertSalesProducts,
  findIdSales,
  findAllSales,
  findBySaleId,
  removeSales,
  updateSales,
};