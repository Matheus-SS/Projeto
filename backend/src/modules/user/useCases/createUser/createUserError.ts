export class EmailAlreadyExistsError extends Error {
  message: string;
  constructor(email: string) {
    super(`Esse email ${email} já foi cadastrado`);
    this.name = 'EmailAlreadyExistsError';
  }
}
