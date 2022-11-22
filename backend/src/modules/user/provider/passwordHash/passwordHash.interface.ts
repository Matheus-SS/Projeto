export interface InterfacePasswordHash {
  generateHash(password: string): Promise<string>;
  comparePassword(
    password: string,
    passswordToCompare: string,
  ): Promise<boolean>;
}
