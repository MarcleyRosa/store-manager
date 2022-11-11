const express = require('express');
// const connection = require('../db/connection');
const { findAll, findById } = require('../db/storeDB');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [products] = await findAll();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [[products]] = await findById(id);
  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  } 
    return res.status(200).json(products);
});

module.exports = router;