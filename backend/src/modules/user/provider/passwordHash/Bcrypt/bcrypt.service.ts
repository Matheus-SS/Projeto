import { InterfacePasswordHash } from '../passwordHash.interface';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '@src/constants';

export class BcryptHashPassword implements InterfacePasswordHash {
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }
  async comparePassword(
    password: string,
    passswordToCompareHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passswordToCompareHash);
  }
}
