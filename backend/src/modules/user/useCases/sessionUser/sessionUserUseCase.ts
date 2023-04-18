import { Inject } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { left, right } from '../../../../shared/core/Result';
import { SessionUserError } from './sessionUserError';
import { ProfileUserUseCaseResponse } from './sessionUserUseCaseResponse';
import { SessionClient } from '../../../../session';
import { ISession } from '../../../../session';

export type SessionUserType = {
  username: string;
  email: string;
  authenticated: boolean;
};

export class SessionUserUseCase
  implements InterfaceUseCase<string, Promise<ProfileUserUseCaseResponse>>
{
  constructor(
    @Inject(SessionClient)
    private session: ISession,
  ) {}
  public async execute(sessionUserId: string): Promise<any> {
    console.log('SESSION', sessionUserId);
    const user = await this.session.getValue(`sess:${sessionUserId}`);
    console.log('USER...', user);
    if (!user) {
      return left(new SessionUserError.SessionNotFoundError());
    }
    const parsedUser = JSON.parse(user);
    const userFormatted: SessionUserType = {
      username: parsedUser.user.username,
      email: parsedUser.user.email,
      authenticated: parsedUser.authenticated,
    };
    return right(userFormatted);
  }
}
