const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const modelSales = require('../../../src/models/sales.model');
const serviceSales = require('../../../src/services/sales.services');

const { mockProducts, mockAllProducts, mockFindIdSales, findsProducts, mockFindSales,
  setSalesIdDate, mockAllsales } = require('../mochs');


const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

const mckBodyProducts = [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]


describe('Test Sales Layer Services', function () {

  describe('Tests get sales by id and not found', function () {
    it('getSalesById sucessful', async function () {
      sinon.stub(modelSales, 'findIdSales').resolves([setSalesIdDate]);

      const findById = await serviceSales.getSalesById(2);

      expect(findById).to.be.deep.equal({ type: null, message: mockFindIdSales});
    })

    it('Tests getSalesById not found', async function () {
      sinon.stub(modelSales, 'findIdSales').resolves([{ type: '404', message: ''}]);

      const findById = await serviceSales.getSalesById(10);

      expect(findById).to.be.deep.equal({ type: '404', message: 'Sale not found'});
    })
  })
  
  describe('Tests Update Sales Products Successful and not found ', function () {
    it('Update Sales Products Successful', async function () {
      sinon.stub(modelSales, 'findBySaleId').resolves(mockFindSales);

      const setUpdate = await serviceSales.updateSalesProducts(mckBodyProducts, 2);

      expect(setUpdate).to.be.deep.equal({ type: null, message: 'Update Sucessful'});
    })
  
  })

  describe('Tests Delete Sales', function () {
    it('Delete Sales', async function () {
      sinon.stub(modelSales, 'findBySaleId').resolves(mockFindSales);

      const setUpdate = await serviceSales.deleteSales(1);

      expect(setUpdate).to.be.deep.equal({ type: null, message: 'Update Sucessful' });
    })
  })

    // it('Test Insert Sales Sucessfull', async function () {
  //   sinon.stub(modelSales, 'findAll').resolves(mockProducts);
  //   sinon.stub(modelSales, 'findAll').resolves(mockAllsales);
  //   sinon.stub(modelSales, 'insert').resolves({ insertId: 3 });
  //   sinon.stub(modelSales, 'insertSalesProducts').resolves([{ affectedRows: 1 }]);

  //   await serviceSales.insertSales(mockAllProducts)


  //   expect(2).to.be.equal(404)
  // })
  
  afterEach(function () {
    sinon.restore();
  });    
})
