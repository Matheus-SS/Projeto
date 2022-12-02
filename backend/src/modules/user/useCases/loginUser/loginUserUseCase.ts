export class LoginUserUseCase {
  public async execute(name, password):Promise<any> {
    return {
      name: name,
      password: password
    }
  }
}