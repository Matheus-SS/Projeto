// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProfileUserError {
  export class ProfileNotFoundError extends Error {
    constructor() {
      super('Usuário não encontrado');
      this.name = 'ProfileNotFoundError';
    }
  }
}
