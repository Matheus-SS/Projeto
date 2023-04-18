import { Either } from '../../../../shared/core/Result';

import { SessionUserError } from './sessionUserError';
import { SessionUserType } from './sessionUserUseCase';

export type ProfileUserUseCaseResponse = Either<
  SessionUserError.SessionNotFoundError,
  SessionUserType
>;
