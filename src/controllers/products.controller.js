const querys = require('../services/products.services');

const routerAllProducts = async (_req, res) => {
    const [products] = await querys.getAllProducts();

    return res.status(200).json(products);
};

const routerProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await querys.getProductsById(Number(id));
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
};

const routerPostProducts = async (req, res) => {
  const item = req.body;
  const [products] = await querys.getAllProducts();
  const newId = products.length + 1;
  const newObj = {
    id: newId,
    name: item.name,
  };
  const insertName = await querys.insertProducts(newObj);
  if (insertName.type) {
    return res.status(Number(insertName.type)).json({ message: insertName.message });
  }
  return res.status(201).json(newObj);
};

const controllerPostSales = async (req, res) => {
  const salesProducts = req.body;

  const objSalesProducts = {
    id: 3,
    itemsSold: salesProducts,
  };
  const requestDB = await querys.insertSales(salesProducts);
    if (requestDB.type) {
    return res.status(Number(requestDB.type)).json({ message: requestDB.message });
  }
  return res.status(201).json(objSalesProducts);
};

const controllerGetSales = async (_req, res) => {
  const [sales] = await querys.getAllSales();
  return res.status(200).json(sales);
};

const controllerGetSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await querys.getSalesById(Number(id));
  if (sales.type) return res.status(Number(sales.type)).json({ message: sales.message });
  return res.status(200).json(sales.message);
};

const controllerPutProductId = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const ids = Number(id);
  const isNamePut = await querys.updateProducts(name, ids);
  if (isNamePut.type) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json({ id: ids, name });
};

const contollerDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const returnDelete = await querys.deleteProducts(Number(id));
  if (returnDelete.type) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).end();
};

module.exports = {
  routerAllProducts,
  routerProductsById,
  routerPostProducts,
  controllerPostSales,
  controllerGetSales,
  controllerGetSalesById,
  controllerPutProductId,
  contollerDeleteProduct,
};