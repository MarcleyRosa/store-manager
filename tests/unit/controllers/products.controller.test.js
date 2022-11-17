const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const connection = require('../../../src/db/connection');
const { routerAllProducts, routerProductsById, routerPostProducts, controllerPostSales,
  controllerGetSalesById, controllerPutProductId, contollerDeleteProduct } = require('../../../src/controllers/products.controller');
const sinonChai = require('sinon-chai');
const productsAll = require('../../../src/services/products.services');
const { mockProducts, mockAllProducts } = require('../mochs');


const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

use(chaiHttp);

describe('Tests camada controller', function () {
  it('Tests endpoints /products find all products', async function () {

    const req = {};
    const res = {};

    const message = { message: 'Product not found' };
    const status = 200;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
  
    sinon.stub(productsAll, 'getAllProducts').resolves(mockProducts)

    await routerAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(status)
    // expect(res.json).to.have.been.calledWith(mockProducts)
  });

  it('Tests endpoints /products find all products', async function () {

    const req = { params: { id: 1 }};
    const res = {};

    const message = { message: 'Product not found' };
    const status = 200;
    const id = 1;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  
    sinon.stub(productsAll, 'getProductsById').resolves(mockProducts[0]);

    await routerProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });
  
  // it('Tests endpoints insert Products sucessfull', async function () {

  //   const req = { body: { name: 'nametest' }};
  //   const res = {};

  //   const message = { message: 'Product not found' };
  //   const status = 201;
  //   const id = 1;

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  
  //   sinon.stub(productsAll, 'insertProducts').resolves(mockProducts[0]);

  //   await routerPostProducts(req, res);

  //   expect(res.status).to.have.been.calledWith(status);
  //  });
  
  it('Tests post product not found', async function () {

    const req = { body: { id: 'nametest' }};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await routerPostProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
  });
  
  it('Tests endpoints post id is not found', async function () {

    const req = { params: { notId: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await routerProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404)
  })

  it('Tests endpoints insert sales ', async function () {

    const req = { body: mockAllProducts };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await controllerPostSales(req, res);

    expect(res.status).to.have.been.calledWith(404)
   })
  
  it('Tests endpoints sales products by id ', async function () {

    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await controllerGetSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Tests endpoints sales products by id ', async function () {

    sinon.stub(productsAll, 'updateProducts').resolves(mockProducts[0]);
    const req = { body: { name: 'nametest'}, params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await controllerPutProductId(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Tests endpoints delete products by id ', async function () {

    sinon.stub(productsAll, 'deleteProducts').resolves(2);
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await contollerDeleteProduct(req, res);

    // expect(res.end).to.be.equal(undefined)
    expect(res.status).to.have.been.calledWith(204)
  })
    afterEach(function () {
     sinon.restore();
   });
});