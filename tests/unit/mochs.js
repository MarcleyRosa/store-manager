const mockProducts = [
  {
      id: 1,
      name: "Martelo de Thor"
    },
    {
      id: 2,
      name: "Traje de encolhimento"
    },
    {
      id: 3,
      name: "Escudo do Capitão América"
    }
]

const findsProducts = [
  {
    id: 1,
    name: "Martelo de Thor"
  }
]
const mockAllProducts = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
]

const mockFindIdSales = [
  {
    productId: 1,
    quantity: 1,
    date: '2022-11-17T21:20:38.000Z',
  },
  {
   date: "2022-11-17T21:20:38.000Z",
   productId: 2,
   quantity: 5,
  }

]

const mockUpdateSales = [
  {productId:1,quantity:1},
  {productId:2,quantity:5},
]

const setSalesIdDate = [
   {
    productId: 1,
    quantity: 1,
    date: '2022-11-17T21:20:38.000Z'
  },
   {
    productId: 2,
    quantity: 5,
    date: '2022-11-17T21:20:38.000Z'
  }
]

const responseMock = {
  type: null,
  message: [
     {
      productId: 1,
      quantity: 1,
      date: '2022-11-17T18:18:52.000Z'
    },
     {
      productId: 2,
      quantity: 5,
      date: '2022-11-17T18:18:52.000Z'
    }
  ]
}


const mockAllsales = [
  { id: 1, date: '2022-11-17T23:37:46.000Z' },
  { id: 2, date: '2022-11-17T23:37:46.000Z' }
]

const mockFindSales = { id: 1, date: '2022-11-17T14:43:12.000Z' }

module.exports = {
  mockProducts,
  mockAllProducts,
  mockFindIdSales,
  findsProducts,
  mockUpdateSales,
  mockFindSales,
  setSalesIdDate,
  mockAllsales,
  responseMock,
}