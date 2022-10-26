import { AppError } from '../../../../shared/core/appError';
import { Either } from '../../../../shared/core/Result';
import { UserEntity } from '../../entity/User';
import { CreateUserError } from './createUserError';

export type CreateUserUseCaseResponse = Either<
  AppError.DomainError | CreateUserError.EmailAlreadyExistsError,
  UserEntity
>;
