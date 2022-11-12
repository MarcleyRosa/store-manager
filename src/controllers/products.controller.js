const querys = require('../services/products.services');

const routerAllProducts = async (_req, res) => {
    try {
      const [products] = await querys.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const routerProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[products]] = await querys.getProductsById(id);
    console.log(products);
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'deu ruim' });
  }
};

const routerPostProducts = async (req, res) => {
  const item = req.body;
  const [products] = await querys.getAllProducts();
  const newId = products.length + 1;
  const newObj = {
    id: newId,
    name: item.name,
  };
  await querys.insertProducts(newObj);
  return res.status(201).json(newObj);
};

module.exports = {
  routerAllProducts,
  routerProductsById,
  routerPostProducts,
};