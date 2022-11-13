const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const connection = require('../../../src/db/connection');
const { routerAllProducts, routerProductsById } = require('../../../src/controllers/products.controller');
const sinonChai = require('sinon-chai');
const productsAll = require('../../../src/services/products.services');


const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

use(chaiHttp);

const mockProducts = [
  {
      id: 1,
      name: "Martelo de Thor"
    },
    {
      id: 2,
      name: "Traje de encolhimento"
    },
    {
      id: 3,
      name: "Escudo do Capitão América"
    }
]

describe('Tests routers /products', function () {
  it('Tests endpoints /products find all products', async function () {

    const req = {}
    const res = {}

    const message = { message: 'Product not found' };
    const status = 200;

    // req.body = { name: 'Testt' }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
  
    sinon.stub(productsAll, 'getAllProducts').resolves(mockProducts)

    await routerAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(status)
    // expect(res.json).to.have.been.calledWith(mockProducts)
  });

  //   it('Tests endpoints /products find all products', async function () {

  //   const req = {}
  //   const res = {}

  //   const message = { message: 'Product not found' };
  //     const status = 200;
  //     const id = 1

  //   // req.params = 1
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns()
  
  //   sinon.stub(productsAll, 'getProductsById').resolves(mockProducts[0])

  //   await routerProductsById(req, res);

  //   expect(res.status).to.have.been.calledWith(status)
  // });
  //   afterEach(function () {
  //    sinon.restore();
  //  });
});