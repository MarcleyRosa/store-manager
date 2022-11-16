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
    productId: 2,
    quantity: 10,
    date: '2022-11-16 12:59:50',
  }
]

module.exports = {
  mockProducts,
  mockAllProducts,
  mockFindIdSales,
}