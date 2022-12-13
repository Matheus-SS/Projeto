/* eslint-disable @typescript-eslint/no-namespace */

export namespace LoginUserError {
  export class EmailOrPasswordIncorrectError extends Error {
    constructor() {
      super('Email ou senha incorretos');
      this.name = 'EmailOrPasswordIncorrectError';
    }
  }
}
