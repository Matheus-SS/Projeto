/* eslint-disable @typescript-eslint/no-namespace */

export namespace CreateUserError {
  export class EmailAlreadyExistsError extends Error {
    constructor(email: string) {
      super(`This email ${email} already exists`);
      this.name = 'EmailAlreadyExistsError';
    }
  }
}
