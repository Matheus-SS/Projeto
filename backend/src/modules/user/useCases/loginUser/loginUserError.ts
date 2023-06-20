export class LoginUserError extends Error {
  constructor() {
    super();
    this.message = 'Usuário ou senha errados';
    this.name = 'UserNotFoundError';
  }
}
