import { EmailAlreadyExistsError } from '@modules/user/useCases/createUser/createUserError';
import { initContract } from '@ts-rest/core';
import { Response } from 'express';
import { z } from 'zod';

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
        409: z.object({
          name: z.literal('EmailAlreadyExistsError'),
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
