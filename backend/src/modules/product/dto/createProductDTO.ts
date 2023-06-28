import { IProduct } from '../repository/productRepository.interface';

export type CreateProduct = Omit<IProduct, 'id' | 'created_at' | 'updated_at'>;
