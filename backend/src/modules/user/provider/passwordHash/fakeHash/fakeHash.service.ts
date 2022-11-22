import { InterfacePasswordHash } from '../passwordHash.interface';

export class FakeHashPassword implements InterfacePasswordHash {
  async generateHash(password: string): Promise<string> {
    return password
  }
  async comparePassword(
    password: string,
    passswordToCompare: string,
  ): Promise<boolean> {
    return password === passswordToCompare;
  }
}
