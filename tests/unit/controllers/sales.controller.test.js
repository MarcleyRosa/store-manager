const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const querys = require('../../../src/controllers/sales.controller');
const sinonChai = require('sinon-chai');

const serviceSales = require('../../../src/services/sales.services');
const { mockProducts, mockAllProducts, mockUpdateSales, findsProducts, responseMock } = require('../mochs');

const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

use(chaiHttp);

describe('Tests Sales layer Controller', function () {
  
  describe('Tests insert Sales Sucessfull and not found', function () {
     it('Tests endpoints insert sales ', async function () {

      const req = { body: mockAllProducts };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(serviceSales, 'insertSales').resolves({ type: '404', message: 'Product not found' })

      await querys.controllerPostSales(req, res);

      expect(res.status).to.have.been.calledWith(404)
     })
    //  it('Tests endpoints insert sales not found ', async function () {

    //   const req = { body: mockAllProducts };
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon.stub(productsAll, 'insertSales').resolves({ type: null, message: 3 })

    //   await querys.controllerPostSales(req, res);

    //    expect(res.status).to.have.been.calledWith(201)
    //  })
  })

  describe('Tests Sales product by id and not found', function () {
    it('Tests endpoints sales products by id ', async function () {

      const req = { params: { id: 3 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(serviceSales, 'getSalesById').resolves(responseMock)

      await querys.controllerGetSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200)
    })
  })

  describe('Tests Delete Sales and not found', function () {
    it('Tests endpoints Delete sales ', async function () {

      sinon.stub(serviceSales, 'deleteSales').resolves(2);
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await querys.contollerDeleteSales(req, res);

      // expect(res.end).to.be.equal(undefined)
      expect(res.status).to.have.been.calledWith(204)
    })
  })

  describe('Tests Update Sucessfull and not found', function () {
    it('Endpoints Update sales ', async function () {

      sinon.stub(serviceSales, 'updateSalesProducts').resolves(mockUpdateSales);
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await querys.controllerUpdateSales(req, res);

      expect(res.status).to.have.been.calledWith(200)
    })
  })

  afterEach(function () {
   sinon.restore();
  });    

})