const serviceProducts = require('../services/products.services');

const routerAllProducts = async (_req, res) => {
    const [products] = await serviceProducts.getAllProducts();

    return res.status(200).json(products);
};

const routerProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await serviceProducts.getProductsById(Number(id));
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
};

const routerPostProducts = async (req, res) => {
  const item = req.body;
  const [products] = await serviceProducts.getAllProducts();
  const newId = products.length + 1;
  const newObj = {
    id: newId,
    name: item.name,
  };
  const insertName = await serviceProducts.insertProducts(newObj);
  if (insertName.type) {
    return res.status(Number(insertName.type)).json({ message: insertName.message });
  }
  return res.status(201).json(newObj);
};

const controllerPutProductId = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const ids = Number(id);
  const isNamePut = await serviceProducts.updateProducts(name, ids);
  if (isNamePut.type) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json({ id: ids, name });
};

const contollerDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const returnDelete = await serviceProducts.deleteProducts(Number(id));
  if (returnDelete.type) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).end();
};

const controllerSearchProduct = async (req, res) => {
  const { q } = req.query;
  const resultSearch = await serviceProducts.searchProduct(q);
  return res.status(200).json(resultSearch);
};

module.exports = {
  routerAllProducts,
  routerProductsById,
  routerPostProducts,
  controllerPutProductId,
  contollerDeleteProduct,
  controllerSearchProduct,
};