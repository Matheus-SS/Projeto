import { Provider } from '@nestjs/common';
import { PROFILE_USER_PROVIDER } from '../../../../constants';
import { ProfileUserUseCase } from './profileUserUseCase';

export const ProfileUserProvider: Provider = {
  provide: PROFILE_USER_PROVIDER,
  useClass: ProfileUserUseCase,
};
