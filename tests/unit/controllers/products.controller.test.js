const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const querys = require('../../../src/controllers/products.controller');
const sinonChai = require('sinon-chai');
const productsAll = require('../../../src/services/products.services');
const { mockProducts, mockAllProducts, mockUpdateSales, findsProducts } = require('../mochs');


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

    await querys.routerAllProducts(req, res);

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

    await querys.routerProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });
  
  it('Tests endpoints insert Products sucessfull', async function () {

    const req = { body: { name: 'nametest' }};
    const res = {};

    const message = { message: 'Product not found' };
    const status = 201;
    const id = 1;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  
    sinon.stub(productsAll, 'insertProducts').resolves(mockProducts[0]);

    await querys.routerPostProducts(req, res);

    expect(res.status).to.have.been.calledWith(status);
   });
  
  it('Tests post product not found', async function () {

    const req = { body: { id: 'nametest' }};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await querys.routerPostProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
  });
  
  it('Tests endpoints post id is not found', async function () {

    const req = { params: { notId: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await querys.routerProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404)
  })

  // it('Tests endpoints insert sales ', async function () {

  //   const req = { body: mockAllProducts };
  //   const res = {};

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   await querys.controllerPostSales(req, res);

  //   expect(res.status).to.have.been.calledWith(404)
  //  })
  
  // it('Tests endpoints sales products by id ', async function () {

  //   const req = { params: { id: 2 } };
  //   const res = {};

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   await querys.controllerGetSalesById(req, res);

  //   expect(res.status).to.have.been.calledWith(404)
  // })

  it('Tests endpoints sales products by id ', async function () {

    sinon.stub(productsAll, 'updateProducts').resolves(mockProducts[0]);
    const req = { body: { name: 'nametest'}, params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await querys.controllerPutProductId(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Tests endpoints delete products by id ', async function () {

    sinon.stub(productsAll, 'deleteProducts').resolves(2);
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await querys.contollerDeleteProduct(req, res);

    // expect(res.end).to.be.equal(undefined)
    expect(res.status).to.have.been.calledWith(204)
  })

  it('Tests endpoints Delete sales ', async function () {

    sinon.stub(productsAll, 'deleteSales').resolves(2);
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await querys.contollerDeleteSales(req, res);

    // expect(res.end).to.be.equal(undefined)
    expect(res.status).to.have.been.calledWith(204)
  })

  it('Tests endpoints Update sales ', async function () {

    sinon.stub(productsAll, 'updateSalesProducts').resolves(mockUpdateSales);
    const req = { params: { id: 2 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await querys.controllerUpdateSales(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Tests endpoints Search Products ', async function () {

    sinon.stub(productsAll, 'searchProduct').resolves(findsProducts);
    const req = { query: { q: 'Martelo' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await querys.controllerSearchProduct(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })
    afterEach(function () {
     sinon.restore();
   });
});