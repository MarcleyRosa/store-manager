const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const controllerProducts = require('../../../src/controllers/products.controller');
const sinonChai = require('sinon-chai');
const serviceProducts = require('../../../src/services/products.services');
const { mockProducts, mockAllProducts, mockUpdateSales, findsProducts } = require('../mochs');


const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

use(chaiHttp);

describe('Tests Products Layer Controller', function () {

  describe('Tests AllProducts successful and not found', function () {
    it('endpoints /products find all products', async function () {

      const req = {};
      const res = {};

      const message = { message: 'Product not found' };
      const status = 200;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns()
  
      sinon.stub(serviceProducts, 'getAllProducts').resolves(mockProducts)

      await controllerProducts.routerAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(status)
      // expect(res.json).to.have.been.calledWith(mockProducts)
    });

  });

  describe('Tests find by id and noy found ', function () {

    it('endpoints /products find products by id', async function () {

      const req = { params: { id: 1 }};
      const res = {};

      const message = { message: 'Product not found' };
      const status = 200;
      const id = 1;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(serviceProducts, 'getProductsById').resolves(mockProducts[0]);

      await controllerProducts.routerProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

  })
  
  describe('Tests endpoint post products and not found', function () {
    it('Endpoints insert Products sucessfull', async function () {

      const req = { body: { name: 'nametest' }};
      const res = {};

      const message = { message: 'Product not found' };
      const status = 201;
      const id = 1;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(serviceProducts, 'insertProducts').resolves(mockProducts[0]);

      await controllerProducts.routerPostProducts(req, res);

      expect(res.status).to.have.been.calledWith(status);
    });

    it('Endpoint post product not found', async function () {

      const req = { body: { id: 'nametest' }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await controllerProducts.routerPostProducts(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('Tests endpoints post id is not found', async function () {

      const req = { params: { notId: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await controllerProducts.routerProductsById(req, res);

      expect(res.status).to.have.been.calledWith(404)
    })
  })
  
  describe('Tests Sales Update Products and not found', function () {
    it('Tests endpoints sales products by id ', async function () {

      sinon.stub(serviceProducts, 'updateProducts').resolves(mockProducts[0]);
      const req = { body: { name: 'nametest' }, params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await controllerProducts.controllerPutProductId(req, res);

      expect(res.status).to.have.been.calledWith(200)
    })

    it('Tests endpoints update products not found ', async function () {

      sinon.stub(serviceProducts, 'updateProducts').resolves({ type: '404', message: 'product not found'});
      const req = { body: { name: '' }, params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await controllerProducts.controllerPutProductId(req, res);

      expect(res.status).to.have.been.calledWith(404)
    })
    
  })

  describe('Tests delete product by id and not found', function () {

    it('endpoints delete products by id ', async function () {

      sinon.stub(serviceProducts, 'deleteProducts').resolves(2);
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await controllerProducts.contollerDeleteProduct(req, res);

      // expect(res.end).to.be.equal(undefined)
      expect(res.status).to.have.been.calledWith(204);
    })

    it('endpoints delete products by id ', async function () {

      sinon.stub(serviceProducts, 'deleteProducts').resolves({ type: '404', message: 'Product not found'});
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      res.json = sinon.stub().returns();

      await controllerProducts.contollerDeleteProduct(req, res);

      // expect(res.end).to.be.equal(undefined)
      expect(res.status).to.have.been.calledWith(404);
    })

  })

  describe('', function () {
    it('Tests endpoints Search Products ', async function () {

      sinon.stub(serviceProducts, 'searchProduct').resolves(findsProducts);
      const req = { query: { q: 'Martelo' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await controllerProducts.controllerSearchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200)
  })
})
    afterEach(function () {
     sinon.restore();
    });
  
  
})