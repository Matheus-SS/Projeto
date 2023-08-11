type NameType = 'EmailAlreadyExistsError';
export class EmailAlreadyExistsError extends Error {
  message: string;
  name: NameType;
  constructor(email: string) {
    super(`Esse email ${email} já foi cadastrado`);
    this.name = 'EmailAlreadyExistsError';
  }
}
