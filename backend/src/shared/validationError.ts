type NameType = 'ValidationInputError';
export class ValidationInputError extends Error {
  name: NameType;
  constructor(message: string) {
    super(message);
    this.name = 'ValidationInputError';
  }
}
