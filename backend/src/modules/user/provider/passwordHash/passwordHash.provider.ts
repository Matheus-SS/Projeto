import { Provider } from '@nestjs/common';
import { PASSWORD_HASH_PROVIDER } from '../constants';
import { BcryptHashPassword } from './Bcrypt/bcrypt.service';

export const PasswordHashProvider: Provider = {
  provide: PASSWORD_HASH_PROVIDER,
  useClass: BcryptHashPassword,
};
