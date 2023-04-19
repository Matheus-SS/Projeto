export class LogoutNotFoundError extends Error {
  constructor() {
    super('Usuário não encontrado');
    this.name = 'SessionNotFoundError';
  }
}
