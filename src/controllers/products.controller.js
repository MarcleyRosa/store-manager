const serviceProducts = require('../services/products.services');

const routerAllProducts = async (_req, res) => {
  try {
    const [products] = await serviceProducts.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const routerProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await serviceProducts.getProductsById(Number(id));
    if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const routerPostProducts = async (req, res) => {  
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  

const controllerPutProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const ids = Number(id);
    const isNamePut = await serviceProducts.updateProducts(name, ids);

    if (isNamePut.type) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json({ id: ids, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  

const contollerDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const returnDelete = await serviceProducts.deleteProducts(Number(id));

    if (returnDelete.type) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const controllerSearchProduct = async (req, res) => {
  try {
    const { q } = req.query;

    const resultSearch = await serviceProducts.searchProduct(q);

    return res.status(200).json(resultSearch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  routerAllProducts,
  routerProductsById,
  routerPostProducts,
  controllerPutProductId,
  contollerDeleteProduct,
  controllerSearchProduct,
};