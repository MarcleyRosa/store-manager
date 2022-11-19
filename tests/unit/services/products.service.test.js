const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const modelProducts = require('../../../src/models/products.model');
const { mockProducts, mockAllProducts, mockFindIdSales, findsProducts, mockFindSales,
  setSalesIdDate, mockAllsales } = require('../mochs');
const serviceProducts = require('../../../src/services/products.services');


const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

const mckBodyProducts = [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]

describe('Tests Products Layer Services', function () {
  
  describe('Tests get Products by id and not found', function () {
    it('findById and getProductsById', async function () {
      sinon.stub(modelProducts, 'findById').resolves(mockProducts[0]);

      const findById = await serviceProducts.getProductsById(1)

      expect(findById).to.deep.equal(mockProducts[0]);
    })
  })

  describe('Tests Insert Products and Validations', function () {
    it('Tests insertProducts name', async function () {
      sinon.stub(modelProducts, 'insert').resolves(mockProducts[0]);

      const insertName = await serviceProducts.insertProducts({ name: 'nametest' })

      expect(insertName.message).to.deep.equal(mockProducts[0]);
    })

    it('Tests insertProducts not name', async function () {
      sinon.stub(modelProducts, 'insert').resolves({});

      const insertName = await serviceProducts.insertProducts({})

      expect(insertName.type).to.deep.equal('400');
    })

    it('Tests insertProducts name length invalid', async function () {
      sinon.stub(modelProducts, 'insert').resolves(undefined);

      const insertName = await serviceProducts.insertProducts({ name: 'MR' })

      expect(insertName.type).to.deep.equal('422');
    })

  })

  describe('Tests Update Successful and fail', function () {
    it('Tests update func updateProducts successful', async function () {
      sinon.stub(modelProducts, 'findById').resolves(mockProducts[0]);

      const setUpdate = await serviceProducts.updateProducts('nametest', 2);

      expect(setUpdate).to.be.deep.equal({ type: null, message: 'Update Sucessful'});
    })
  })

  describe('Tests Delete Product Successful and fail', function () {
    it('Tests update func updateProducts sucessful', async function () {
      sinon.stub(modelProducts, 'findById').resolves(mockProducts[0]);

      const setUpdate = await serviceProducts.deleteProducts(2);

      expect(setUpdate).to.be.deep.equal({ type: null, message: 'Update Sucessful'});
    })
  })

  describe('Tests Search Products and not params', function () {
    it('Search Products', async function () {
      sinon.stub(modelProducts, 'findAll').resolves([mockProducts]);

      const setUpdate = await serviceProducts.searchProduct('Martelo');

      expect(setUpdate).to.be.deep.equal(findsProducts);
    })

    it('Search Products not params', async function () {
      sinon.stub(modelProducts, 'findAll').resolves([mockProducts]);

      const setUpdate = await serviceProducts.searchProduct('');

      expect(setUpdate).to.be.deep.equal(mockProducts);
    })

  })

   afterEach(function () {
     sinon.restore();
   });
})