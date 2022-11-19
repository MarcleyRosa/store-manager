const sinon = require('sinon');
const connection = require('../../../src/db/connection')
const modelProducts = require('../../../src/models/products.model');

const { expect } = require('chai');
const { mockProducts } = require('../mochs');


describe('Tests Products layer Model', function () {

  describe('Tests find all products', function () {

    it('Find all products', async function () {
      sinon.stub(connection, 'execute').resolves(mockProducts);
      const newItem = await modelProducts.findAll();

      expect(newItem).to.equal(mockProducts);
    });
  
  })

  describe('Tests find id by products', function () {
    it('Find by id products', async function () {
      sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
      const findId = await modelProducts.findById(1);

      expect(findId).to.be.equal(mockProducts[0]);
    });

  })

  describe('Tests insert products successful and fail', function () {
  
    it('Test find by id products', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
      const findId = await modelProducts.insert({ name: 'testName'}, 'products');

      expect(findId).to.be.equal(2); 
    });
  
  });

  afterEach(function () {
    sinon.restore();
  });
})