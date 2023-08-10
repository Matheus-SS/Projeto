import { EmailAlreadyExistsError } from '@modules/user/useCases/createUser/createUserError';
import { initContract } from '@ts-rest/core';
import { Response } from 'express';
import { z } from 'zod';
import {
  EMAIL_ALREADY_EXISTS_ERROR,
  INTERNAL_SERVER_ERROR,
  VALIDATION_INPUT_ERROR,
} from './constants.error';

const c = initContract();

const userSchema = z.object({
  username: z
    .string({
      required_error: 'Nome de usuário obrigatório',
    })
    .min(4, 'Nome de usuário pelo menos 4 caracteres')
    .max(15, 'Nome de usuário no máximo 15 caracteres'),
  email: z
    .string({
      required_error: 'Email obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
  password: z
    .string({
      required_error: 'Password obrigatório',
    })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const contract = c.router(
  {
    createUser: {
      method: 'POST',
      path: '/user',
      responses: {
        201: z.literal('ok'),
        400: z.object({
          name: z.literal(VALIDATION_INPUT_ERROR),
          message: z.string(),
        }),
        409: z.object({
          name: z.literal(EMAIL_ALREADY_EXISTS_ERROR),
          message: z.string(),
        }),
        500: z.object({
          name: z.literal(INTERNAL_SERVER_ERROR),
          message: z.string(),
        }),
      },
      strictStatusCodes: true,
      body: z.object({
        username: z
          .string({
            required_error: 'Nome de usuário obrigatório',
          })
          .min(4, 'Nome de usuário pelo menos 4 caracteres')
          .max(15, 'Nome de usuário no máximo 15 caracteres'),
        email: z
          .string({
            required_error: 'Email obrigatório',
          })
          .email({
            message: 'Email inválido',
          }),
        password: z
          .string({
            required_error: 'Password obrigatório',
          })
          .min(6, 'Senha deve ter pelo menos 6 caracteres'),
      }),
      summary: 'Create User',
    },
  },
  { pathPrefix: '/api/v1' },
);
