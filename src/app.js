const express = require('express');
const productsRouter = require('./routers/products.router');
const salesRouter = require('./routers/sales.router');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

module.exports = app;