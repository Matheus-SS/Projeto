import { AppError } from 'src/shared/core/appError';
import { Either, left, Result, right } from '../../../shared/core/Result';

export type UserType = {
  id?: number;
  username: string;
  email: string;
  password: string;
};

export class UserEntity {
  private props: UserType;

  private constructor(userProps: UserType) {
    this.props = userProps;
  }

  public static createUser(userProps: UserType): Result<UserEntity> {
    if (userProps.username.length < 4) {
      return Result.fail('User must contain at least 4 characters');
    }

    if (userProps.password.length < 6) {
      return Result.fail('Password must contain at least 6 characters');
    }

    if (this.hasWhiteSpace(userProps.password)) {
      return Result.fail('Password cannot have whitespace');
    }

    if (!this.isValidEmail(userProps.email)) {
      return Result.fail('Invalid email');
    }

    return Result.ok<UserEntity>(
      new UserEntity({
        email: userProps.email.toLowerCase().trim(),
        password: userProps.password,
        username: userProps.username.trim(),
      }),
    );
  }

  get getProps(): UserType {
    return this.props;
  }

  get getUsername(): string {
    return this.props.username;
  }

  get getEmail(): string {
    return this.props.email;
  }

  get getPassword(): string {
    return this.props.password;
  }

  set setPassword(value: string) {
    this.props.password = value;
  }

  private static hasWhiteSpace(value: string): boolean {
    const regex = new RegExp(/\s/g);

    return regex.test(value);
  }

  private static isValidEmail(value: string): boolean {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    );

    return emailRegex.test(value);
  }
}
