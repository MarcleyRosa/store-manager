const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection')
const model = require('../../../src/models/products.model');

const chaiHttp = require('chai-http');
const express = require('express');
const { expect } = require('chai');

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
    await model.findById(2);
    await model.remove(1);
    await model.insert({ name: 'test' })
    await model.update(mockFindId, 2);

    expect(newItem).to.equal(mockProducts)
  });
  // it('Test find by id products', async function () {
  //   sinon.stub(connection, 'execute').resolves([[mockFindId]]);
  //   const findId = await model.findById(2);

  //   expect(findId).to.be.deep.equal(mockFindId);
  // });
});