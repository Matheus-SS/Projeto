import { Inject } from '@nestjs/common';
import { ISession, SessionClient } from '../../../../session';
import { Either, left, right } from '../../../../shared/core/Result';
import * as logoutError from './logoutUserError';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';

export class LogoutUserUseCase
  implements
    InterfaceUseCase<
      string,
      Promise<Either<logoutError.LogoutNotFoundError, boolean>>
    >
{
  constructor(
    @Inject(SessionClient)
    private session: ISession,
  ) {}
  public async execute(
    sessionIdUser: string,
  ): Promise<Either<logoutError.LogoutNotFoundError, boolean>> {
    const user = await this.session.getValue(`sess:${sessionIdUser}`);
    if (!user) {
      return left(new logoutError.LogoutNotFoundError());
    }

    await this.session.deleteValue(`sess:${sessionIdUser}`);

    return right(true);
  }
}
