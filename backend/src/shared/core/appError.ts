/* eslint-disable @typescript-eslint/no-namespace */

export namespace AppError {
  export class DomainError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DomainError';
    }
  }

  export class InternalError extends Error {
    constructor() {
      super('Internal Server Error');
      this.name = 'InternalError';
    }
  }
}
