import { EMAIL_ALREADY_EXISTS_ERROR } from '@src/constants.error';
type NameType = typeof EMAIL_ALREADY_EXISTS_ERROR;
export class EmailAlreadyExistsError extends Error {
  message: string;
  name: NameType;
  constructor(email: string) {
    super(`Esse email ${email} já foi cadastrado`);
    this.name = 'EmailAlreadyExistsError';
  }
}
