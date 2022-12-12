import { Result } from '../../../shared/core/Result';
import { userErrorEnum } from './userError.enum';

export class Password {
  private value: string;

  get getValue(): string {
    return this.value;
  }

  set setPassword(value: string) {
    this.value = value;
  }

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Password> {
    if (value.length < 6) {
      return Result.fail(userErrorEnum.PASSWORD_MIN_LENGTH);
    }

    if (this.hasWhiteSpace(value)) {
      return Result.fail(userErrorEnum.PASSWORD_WHITESPACE);
    }

    return Result.ok<Password>(new Password(value));
  }

  private static hasWhiteSpace(value: string): boolean {
    const regex = new RegExp(/\s/g);

    return regex.test(value);
  }
}
