const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const { getProductsById, insertProducts } = require('../../../src/services/products.services');
const sinonChai = require('sinon-chai');
const model = require('../../../src/models/products.model');
const { mockProducts, mockAllProducts } = require('../mochs');
const getAllProducts = require('../../../src/services/products.services');


const express = require('express');
chai.use(sinonChai)

const app = express();

const { expect, use } = chai;

describe('Tests camada services', function () {
  it('Tests findById and getProductsById', async function () {
    sinon.stub(model, 'findById').resolves(mockProducts[0]);

    const findById = await getProductsById(1)

    expect(findById).to.deep.equal(mockProducts[0]);
  })
  it('Tests insertProducts name', async function () {
    sinon.stub(model, 'insert').resolves(mockProducts[0]);

    const insertName = await insertProducts({ name: 'nametest' })

    expect(insertName.message).to.deep.equal(mockProducts[0]);
  })
  it('Tests insertProducts not name', async function () {
    // sinon.stub(model, 'insert').resolves({});

    const insertName = await insertProducts({})

    expect(insertName.type).to.deep.equal('400');
  })
  it('Tests insertProducts name length invalid', async function () {
    // sinon.stub(model, 'insert').resolves({});

    const insertName = await insertProducts({ name: 'MR'})

    expect(insertName.type).to.deep.equal('422');
  })
  it('Test quantuty value < 1', async function () {
    const quantity = await getAllProducts.insertSales(mockAllProducts);

    expect(quantity.type).to.be.equal(null)
  })
})