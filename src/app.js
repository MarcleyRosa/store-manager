const express = require('express');
const productsRouter = require('./routers/products.rauter');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

module.exports = app;