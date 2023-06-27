import { Provider } from '@nestjs/common';
import { DELETE_SESSION_USE_CASE_PROVIDER } from '@src/constants';
import { DeleteSessionUseCase } from './deleteSessionUseCase';

export const DeleteSessionUseCaseProvider: Provider = {
  provide: DELETE_SESSION_USE_CASE_PROVIDER,
  useClass: DeleteSessionUseCase,
};
