import { Result } from '../../../shared/core/Result';
import { userErrorEnum } from './userError.enum';

export class Username {
  private value: string;

  get getValue(): string {
    return this.value;
  }

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Username> {
    if (value.length < 4) {
      return Result.fail<Username>(userErrorEnum.USERNAME_MIN_LENGTH);
    }

    return Result.ok<Username>(new Username(value.trim()));
  }
}
