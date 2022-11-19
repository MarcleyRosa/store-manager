const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection')
const modelSales = require('../../../src/models/sales.model');
const { mockFindSales } = require('../mochs');

const { expect } = chai;

describe('Tests Sales layer Model', function () {

  describe('Tests find id sales Sucessfull and not found', function () {

    it('Test find by id Sales', async function () {
      sinon.stub(connection, 'execute').resolves([[mockFindSales]]);
      const findId = await modelSales.findBySaleId(1);

      expect(findId).to.be.equal(mockFindSales); 
    });
  })

  describe('Tests insert Sales Sucessfull and not found', function () {
  })
})