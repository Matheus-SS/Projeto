export class ValidationInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationInputError';
  }
}
