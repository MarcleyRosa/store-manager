const serviceSales = require('../services/sales.services');

const controllerPostSales = async (req, res) => {
  try {
    const salesProducts = req.body;

    const response = await serviceSales.insertSales(salesProducts);

    if (response.type) {
    return res.status(Number(response.type)).json({ message: response.message });
    }

    const objSalesProducts = {
      id: response.message,
      itemsSold: salesProducts,
    };

    return res.status(201).json(objSalesProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const controllerGetSales = async (_req, res) => {
  try {
    const [sales] = await serviceSales.getAllSales();
    
    return res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const controllerGetSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await serviceSales.getSalesById(Number(id));
    if (sales.type) return res.status(Number(sales.type)).json({ message: sales.message });
    return res.status(200).json(sales.message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const contollerDeleteSales = async (req, res) => {
  try {
    const { id } = req.params;
    const returnDelete = await serviceSales.deleteSales(Number(id));
    if (returnDelete.type) return res.status(404).json({ message: 'Sale not found' });
    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const controllerUpdateSales = async (req, res) => {
  try {  
    const { id } = req.params;
    const bodyProducts = req.body;
    const ids = Number(id);
    const result = await serviceSales.updateSalesProducts(bodyProducts, ids);
    if (result.type) return res.status(Number(result.type)).json({ message: result.message });
    const newJson = {
      saleId: ids,
      itemsUpdated: bodyProducts,
    };
    return res.status(200).json(newJson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  controllerPostSales,
  controllerGetSales,
  controllerGetSalesById,
  contollerDeleteSales,
  controllerUpdateSales,
};