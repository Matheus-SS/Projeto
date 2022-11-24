import { Result } from '../../../shared/core/Result';
import { errorEntity } from './error.enum';

export type ProductType = {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  categoryId: number;
};
export class ProductEntity {
  private props: ProductType;
  private constructor(productProps: ProductType) {
    this.props = productProps;
  }

  public static createProduct(
    productProps: ProductType,
  ): Result<ProductEntity> {
    if (this.isEmpty(productProps.name)) {
      return Result.fail(errorEntity.name);
    }
    if (this.isEmpty(productProps.description)) {
      return Result.fail(errorEntity.description);
    }
    if (
      !this.isNumber(productProps.categoryId) ||
      this.isEmpty(productProps.categoryId)
    ) {
      return Result.fail(errorEntity.categoryId);
    }
    if (!this.isNumber(productProps.quantity)) {
      return Result.fail(errorEntity.quantity);
    }
    if (this.isEmpty(productProps.imageUrl)) {
      return Result.fail(errorEntity.imageUrl);
    }

    return Result.ok<ProductEntity>(
      new ProductEntity({
        name: productProps.name.trim(),
        description: productProps.description.trim(),
        categoryId: productProps.categoryId,
        quantity: productProps.quantity,
        imageUrl: productProps.imageUrl.trim(),
      }),
    );
  }

  get getProps(): ProductType {
    return this.props;
  }

  get getName(): string {
    return this.props.name;
  }

  get getDescription(): string {
    return this.props.description;
  }

  get getCategoryId(): number {
    return this.props.categoryId;
  }

  get getQuantity(): number {
    return this.props.quantity;
  }

  get getImageUrl(): string {
    return this.props.imageUrl;
  }

  private static isEmpty(value: any): boolean {
    if (!value) return true;
    return false;
  }

  private static isNumber(value: number): boolean {
    const regex = new RegExp(/^\d+$/);

    return regex.test(String(value));
  }
}
