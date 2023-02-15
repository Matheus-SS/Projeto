import { AppError } from '../../../../shared/core/appError';
import { Either } from '../../../../shared/core/Result';
import { UserDataType } from '../../entity/User';
import { LoginUserError } from './loginUserError';

export type LoginUserUseCaseResponse = Either<
  AppError.DomainError | LoginUserError.EmailOrPasswordIncorrectError,
  UserDataType
>;
