/* eslint-disable @typescript-eslint/no-namespace */

export namespace CreateUserError {
  export class EmailAlreadyExistsError extends Error {
    constructor(email: string) {
      super(`Esse email ${email} já foi cadastrado`);
      this.name = 'EmailAlreadyExistsError';
    }
  }
}
