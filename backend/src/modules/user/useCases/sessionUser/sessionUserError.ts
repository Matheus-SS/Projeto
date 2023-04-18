// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SessionUserError {
  export class SessionNotFoundError extends Error {
    constructor() {
      super('Usuário não encontrado');
      this.name = 'SessionNotFoundError';
    }
  }
}
