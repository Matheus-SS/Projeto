/* eslint-disable @typescript-eslint/no-namespace */

export namespace AppError {
  export class DomainError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DomainError';
    }
  }
}
