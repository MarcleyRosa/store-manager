const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const express = require('express');
const connection = require('../../../src/db/connection');

const app = express();

const { expect, use } = chai;

use(chaiHttp);

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

describe('Tests routers /products', function () {
  it('Tests endpoints /products find all products', async function () {
  
    sinon.stub(connection, 'execute').resolves([{ mockProducts }])
  });
  afterEach(sinon.restore);
});