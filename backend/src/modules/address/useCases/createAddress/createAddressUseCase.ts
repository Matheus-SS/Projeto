import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY_PROVIDER } from '@src/constants';
import { ReturnType, ValidationReturnType } from '@shared/returnType';
import { z } from 'zod';
import { ValidationInputError } from '@shared/validationError';

import {
  CreateAddress,
  IAddressRepository,
} from '../../repository/addressRepository.interface';

type CreateAddressResponse = {
  id: number;
  user_id: number;
  cep: string;
  public_place?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  uf: string;
  created_at: Date;
  updated_at?: Date;
  user_username: string;
  user_email: string;
  user_created_at: Date;
  user_updated_at?: Date;
};

const listUF = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const;

@Injectable()
export class CreateAddressUseCase {
  constructor(
    @Inject(ADDRESS_REPOSITORY_PROVIDER)
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    cep,
    city,
    neighborhood,
    uf,
    user_id,
    complement,
    public_place,
  }: CreateAddress): Promise<
    ReturnType<ValidationInputError, CreateAddressResponse>
  > {
    const isValidInput = this.validateInput({
      cep,
      city,
      neighborhood,
      uf,
      user_id,
      complement,
      public_place,
    });

    if (isValidInput.success === false) {
      return {
        error: new ValidationInputError(isValidInput.error),
        success: false,
      };
    }

    const id = await this.addressRepository.create({
      cep,
      city,
      neighborhood,
      uf,
      user_id,
      complement,
      public_place,
    });

    const address = await this.addressRepository.findById(id);

    return { data: address[0], success: true };
  }

  public validateInput({
    cep,
    city,
    neighborhood,
    uf,
    user_id,
    complement,
    public_place,
  }: CreateAddress): ValidationReturnType<string, void> {
    const addressSchema = z.object({
      user_id: z.number({
        required_error: 'Id do usuário é obrigatório',
      }),
      uf: z.enum(listUF, {
        errorMap: (issue) => {
          switch (issue.code) {
            case 'invalid_type':
              return { message: 'Valor deve ser uma string' };
            case 'invalid_enum_value':
              return { message: 'Deve conter um UF válido' };
            default:
              return { message: 'Uf inválido' };
          }
        },
      }),
      cep: z
        .string()
        .min(8, {
          message: 'Cep deve conter 8 dígitos',
        })
        .max(8, {
          message: 'Cep deve conter 8 dígitos',
        })
        .regex(/^\d+$/, {
          message: 'Cep deve conter apenas números',
        }),
      public_place: z
        .string()
        .max(200, {
          message: 'Não pode conter mais de 200 caracteres',
        })
        .optional(),
      complement: z
        .string()
        .max(250, {
          message: 'Não pode conter mais de 250 caracteres',
        })
        .optional(),
      city: z
        .string({ required_error: 'Nome da cidade obrigatório' })
        .min(1, {
          message: 'Deve conter no mínimo 1 caracter',
        })
        .max(50, {
          message: 'Não pode conter mais de 50 caracteres',
        }),
      neighborhood: z
        .string({ required_error: 'Nome do bairro obrigatório' })
        .min(1, {
          message: 'Deve conter no mínimo 1 caracter',
        })
        .max(50, {
          message: 'Não pode conter mais de 50 caracteres',
        }),
    });

    const results = addressSchema.safeParse({
      user_id,
      cep,
      public_place,
      complement,
      neighborhood,
      city,
      uf,
    });

    if (results.success === false) {
      const { issues } = results.error;
      return {
        error: issues[0].message,
        success: false,
      };
    } else {
      return {
        data: null,
        success: true,
      };
    }
  }
}
