export interface InterfacePasswordHash {
  generateHash(password: string): Promise<string>;
  comparePassword(password: string, passswordHash: string): Promise<boolean>;
}
