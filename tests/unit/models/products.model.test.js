const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection')
const model = require('../../../src/models/products.model');
const sinonChai = require('sinon-chai');

const chaiHttp = require('chai-http');
const express = require('express');
const { expect } = require('chai');

chai.use(sinonChai)

const mockProducts = [
  {
      "id": 1,
      "name": "Martelo de Thor"
    },
    {
      "id": 2,
      "name": "Traje de encolhimento"
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América"
    }
]
const mockFindId = [{
      "id": 2,
      "name": "Traje de encolhimento"
    }]

describe('Tests Models', function () {
  it('Test find all products', async function () {
    sinon.stub(connection, 'execute').resolves(mockProducts);
    const newItem = await model.findAll();
    // await model.findById(2);
    // await model.remove(1);
    // await model.insert({ name: 'test' });
    // await model.update(mockFindId, 2);

    expect(newItem).to.equal(mockProducts);
  });
  it('Test find by id products', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
    const findId = await model.findById(1);
    console.log('find model ', findId);

    expect(findId).to.be.equal(mockProducts[0]);
  });
    it('Test find by id products', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
    const findId = await model.insert({ name: 'testName'}, 'products');
    console.log('find model ', findId);

    expect(findId).to.be.equal(2); 
  });
  afterEach(function () {
     sinon.restore();
   });
});