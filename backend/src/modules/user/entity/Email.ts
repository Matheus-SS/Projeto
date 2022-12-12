import { Result } from '../../../shared/core/Result';
import { userErrorEnum } from './userError.enum';

export class Email {
  private value: string;

  get getValue(): string {
    return this.value;
  }

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Result<Email> {
    if (!this.isValidEmail(value)) {
      return Result.fail(userErrorEnum.EMAIL_INVALID);
    }

    return Result.ok<Email>(new Email(value.toLowerCase().trim()));
  }

  private static isValidEmail(value: string): boolean {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    );

    return emailRegex.test(value);
  }
}
