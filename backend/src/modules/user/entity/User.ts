import { Result } from '../../../shared/core/Result';
import { Email } from './Email';
import { Password } from './Password';
import { Username } from './Username';

export type UserType = {
  id?: number;
  username: Username;
  email: Email;
  password: Password;
};

export type UserDataType = {
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

  public static createUser(userProps: UserDataType): Result<UserEntity> {
    const usernameOrFail = Username.create(userProps.username);
    const passwordOrFail = Password.create(userProps.password);
    const emailOrFail = Email.create(userProps.email);
    if (usernameOrFail.failure) {
      return Result.fail(usernameOrFail.error.toString());
    }

    if (passwordOrFail.failure) {
      return Result.fail(passwordOrFail.error.toString());
    }

    if (emailOrFail.failure) {
      return Result.fail(emailOrFail.error.toString());
    }

    return Result.ok<UserEntity>(
      new UserEntity({
        email: emailOrFail.getValue(),
        password: passwordOrFail.getValue(),
        username: usernameOrFail.getValue(),
      }),
    );
  }

  get getProps(): UserDataType {
    return {
      username: this.getUsername.getValue,
      email: this.getEmail.getValue,
      password: this.getPassword.getValue,
    };
  }

  get getUsername(): Username {
    return this.props.username;
  }

  get getEmail(): Email {
    return this.props.email;
  }

  get getPassword(): Password {
    return this.props.password;
  }

  set setPassword(value: string) {
    this.props.password.setPassword = value;
  }
}
