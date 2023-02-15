import { Either } from '../../../../shared/core/Result';
import { UserDataType } from '../../entity/User';
import { ProfileUserError } from './profileUserError';

export type ProfileUserUseCaseResponse = Either<
  ProfileUserError.ProfileNotFoundError,
  UserDataType
>;
