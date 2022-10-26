import { Controller, Inject, Post, Res } from '@nestjs/common';
import { AppError } from 'src/shared/core/appError';
import { BaseController } from '../../../../shared/http/baseController';
import { CREATE_USER_PROVIDER } from '../../../../constants';
import { CreateUserError } from './createUserError';
import { InterfaceUseCase } from '../../../../shared/core/useCase.interface';
import { CreateUserDTO } from './createUserDTO';
import { CreateUserUseCaseResponse } from './createUserUseCaseResponse';
import { Response } from 'express';

@Controller('api/v1/user')
export class CreateUserController extends BaseController {
  constructor(
    @Inject(CREATE_USER_PROVIDER)
    private createUser: InterfaceUseCase<
      CreateUserDTO,
      Promise<CreateUserUseCaseResponse>
    >,
  ) {
    super();
  }

  @Post('/create')
  async executeImpl(@Res() response): Promise<Response> {
    const user = {
      username: 'sinn',
      email: 'string12@gmail.com',
      password: 'string',
    };

    try {
      const result = await this.createUser.execute(user);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AppError.DomainError:
            return this.badRequest(response, error.message);
          case CreateUserError.EmailAlreadyExistsError:
            return this.conflict(response, error.message);
          default:
            return this.internalError(response, error.message);
        }
      } else {
        return this.ok(response, result.value.getProps);
      }
    } catch (error) {
      return this.internalError(response, error.message);
    }
  }
}
