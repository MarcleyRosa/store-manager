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

  const response = await querys.insertSales(salesProducts);

  if (response.type) {
    return res.status(Number(response.type)).json({ message: response.message });
  }

  const objSalesProducts = {
    id: response.message,
    itemsSold: salesProducts,
  };

  return res.status(201).json(objSalesProducts);
};

const controllerGetSales = async (_req, res) => {
  const [sales] = await querys.getAllSales();
  return res.status(200).json(sales);
};

const controllerGetSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await querys.getSalesById(Number(id));
  console.log('ree Sales', sales);
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

const contollerDeleteSales = async (req, res) => {
  const { id } = req.params;
  const returnDelete = await querys.deleteSales(Number(id));
  if (returnDelete.type) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).end();
};

const controllerUpdateSales = async (req, res) => {
  const { id } = req.params;
  const bodyProducts = req.body;
  const ids = Number(id);
  const result = await querys.updateSalesProducts(bodyProducts, ids);
  if (result.type) return res.status(Number(result.type)).json({ message: result.message });
  const newJson = {
    saleId: ids,
    itemsUpdated: bodyProducts,
  };
  return res.status(200).json(newJson);
};

const controllerSearchProduct = async (req, res) => {
  const { q } = req.query;
  const resultSearch = await querys.searchProduct(q);
  return res.status(200).json(resultSearch);
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
  contollerDeleteSales,
  controllerUpdateSales,
  controllerSearchProduct,
};