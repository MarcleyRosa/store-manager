const express = require('express');
// const { findAll } = require('./db/storeDB');
const productsRouter = require('./routers/products.rauter');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', productsRouter);

module.exports = app;