import { errorEntity } from './error.enum';
import { ProductEntity } from './Product';

test('Deve criar um produto', () => {
  const product = ProductEntity.createProduct({
    id: 1,
    name: 'banana',
    quantity: 50,
    categoryId: 20,
    description: 'Banana vinda da amazônia',
    imageUrl: 'http://localhost/images/banana.png',
  });

  const productOrFail = product.getValue();
  expect(productOrFail.getName).toBe('banana');
  expect(productOrFail.getDescription).toBe('Banana vinda da amazônia');
  expect(productOrFail.getCategoryId).toBe(20);
  expect(productOrFail.getQuantity).toBe(50);
  expect(productOrFail.getImageUrl).toBe('http://localhost/images/banana.png');
});

test('Deve dar erro ao tentar criar produto com nome vazio', () => {
  const product = ProductEntity.createProduct({
    id: 1,
    name: '',
    quantity: 50,
    categoryId: 20,
    description: '',
    imageUrl: 'http://localhost/images/banana.png',
  });

  expect(product.failure).toBe(true);
  expect(product.error).toBe(errorEntity.name);
});

test('Deve dar erro ao tentar criar produto com descrição vazia', () => {
  const product = ProductEntity.createProduct({
    id: 1,
    name: 'banana',
    quantity: 50,
    categoryId: 20,
    description: '',
    imageUrl: 'http://localhost/images/banana.png',
  });

  expect(product.failure).toBe(true);
  expect(product.error).toBe(errorEntity.description);
});

test.each([0, 1.2])(
  'Deve dar erro ao tentar criar produto com categoria id inválida',
  (categoryId) => {
    const product = ProductEntity.createProduct({
      id: 1,
      name: 'banana',
      quantity: 50,
      categoryId: categoryId,
      description: 'Banana vinda da amazônia',
      imageUrl: 'http://localhost/images/banana.png',
    });

    expect(product.failure).toBe(true);
    expect(product.error).toBe(errorEntity.categoryId);
  },
);

test('Deve dar erro ao tentar criar produto com quantidade que não é número inteiro', () => {
  const product = ProductEntity.createProduct({
    id: 1,
    name: 'banana',
    quantity: 1.8,
    categoryId: 20,
    description: 'Banana vinda da amazônia',
    imageUrl: 'http://localhost/images/banana.png',
  });

  expect(product.failure).toBe(true);
  expect(product.error).toBe(errorEntity.quantity);
});

test('Deve dar erro ao tentar criar produto sem url de imagem', () => {
  const product = ProductEntity.createProduct({
    id: 1,
    name: 'banana',
    quantity: 0,
    categoryId: 20,
    description: 'Banana vinda da amazônia',
    imageUrl: '',
  });

  expect(product.failure).toBe(true);
  expect(product.error).toBe(errorEntity.imageUrl);
});
