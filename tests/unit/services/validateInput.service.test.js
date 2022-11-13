const chai = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/products.model');
const service = require('../../../src/services/validations/validationInput');
const { mockProducts } = require('../mochs');
const sinonChai = require('sinon-chai');

const chaiHttp = require('chai-http');
const express = require('express');
const { expect } = require('chai');

const nameInvalid = {
  name: "PX"
}

const nameValid = {
  name: "ProdutoX"
}

chai.use(sinonChai)

describe('Tests camadas Services', function () {
  it('Tests validations func validateName', async function () {
    sinon.stub(model, 'insert');
    const insr = await service.validateName({})

    expect(insr.type).to.be.equal('400')
  })

  it('Tests validations func validateName', async function () {
    sinon.stub(model, 'insert');
    const insr = await service.validateName(nameValid)

    // expect(insr.type).to.be.equal(null)
  })

   it('Tests validations func validateLength', async function () {
     sinon.stub(model, 'insert');
  
    const insr = await service.validateLength(nameInvalid)

    expect(insr.type).to.be.equal('422')
   })
  
    it('Tests validations func validateLength', async function () {
     sinon.stub(model, 'insert');
  
    const insr = await service.validateLength(nameValid)

    // expect(insr.type).to.be.equal(null)
    })

  afterEach(function () {
     sinon.restore();
   });
})