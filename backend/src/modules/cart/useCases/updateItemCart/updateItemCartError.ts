type ProductNotFound = 'ProductNotFoundError';
type ProductGreaterThanAllowed = 'ProductGreaterThanAllowedError';
type ProductOutStock = 'ProductOutStockError';

export class ProductNotFoundError extends Error {
  name: ProductNotFound;
  constructor() {
    super();
    this.message = 'Produto não encontrado';
    this.name = 'ProductNotFoundError';
  }
}

export class ProductGreaterThanAllowedError extends Error {
  name: ProductGreaterThanAllowed;
  constructor() {
    super();
    this.message = 'Quantidade maior do que a permitida';
    this.name = 'ProductGreaterThanAllowedError';
  }
}

export class ProductOutStockError extends Error {
  name: ProductOutStock;
  constructor() {
    super();
    this.message = 'Produto fora de estoque';
    this.name = 'ProductOutStockError';
  }
}
