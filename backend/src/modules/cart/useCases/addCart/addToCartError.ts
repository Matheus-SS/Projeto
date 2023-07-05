export class ProductNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Produto não encontrado';
    this.name = 'ProductNotFoundError';
  }
}

export class ProductGreaterThanAllowed extends Error {
  constructor() {
    super();
    this.message = 'Quantidade maior do que a permitida';
    this.name = 'ProductGreaterThanAllowed';
  }
}

export class ProductOutStock extends Error {
  constructor() {
    super();
    this.message = 'Produto fora de estoque';
    this.name = 'ProductOutStock';
  }
}
