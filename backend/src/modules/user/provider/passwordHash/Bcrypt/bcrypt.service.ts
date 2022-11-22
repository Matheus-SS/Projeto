import { InterfacePasswordHash } from '../passwordHash.interface';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../constants';

export class BcryptHashPassword implements InterfacePasswordHash {
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }
  async comparePassword(
    password: string,
    passswordToCompare: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passswordToCompare);
  }
}
