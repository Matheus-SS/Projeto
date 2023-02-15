import { Inject } from '@nestjs/common';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { left, right } from '../../../../shared/core/Result';
import { USER_REPOSITORY_PROVIDER } from '../../repository/constants';
import { InterfaceUserRepository } from '../../repository/userRepository.interface';
import { UserEntity } from '../../entity/User';
import { ProfileUserError } from './profileUserError';
import { ProfileUserUseCaseResponse } from './profileUserUseCaseResponse';

export class ProfileUserUseCase
  implements InterfaceUseCase<string, Promise<ProfileUserUseCaseResponse>>
{
  constructor(
    @Inject(USER_REPOSITORY_PROVIDER)
    private userRepository: InterfaceUserRepository,
  ) {}
  public async execute(email: string): Promise<ProfileUserUseCaseResponse> {
    const user: UserEntity = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new ProfileUserError.ProfileNotFoundError());
    }

    return right(user.getProps);
  }
}
