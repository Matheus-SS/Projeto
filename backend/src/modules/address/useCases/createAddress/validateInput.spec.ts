/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateAddress,
  IAddressAll,
  IAddressRepository,
} from '../../repository/addressRepository.interface';
import { CreateAddressUseCase } from './createAddressUseCase';

class FakeAddressRepository implements IAddressRepository {
  findByUserId(user_id: number): Promise<IAddressAll[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number, user_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<IAddressAll[]> {
    throw new Error('Method not implemented.');
  }
  create(data: CreateAddress): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

function generateString(quantity: number): string {
  let string = '';

  for (let index = 0; index < quantity; index++) {
    string += 'a';
  }

  return string;
}
describe('Create Address Use Case', () => {
  let addressRepository: IAddressRepository;
  let createAddress: CreateAddressUseCase;
  beforeAll(() => {
    addressRepository = new FakeAddressRepository();
    createAddress = new CreateAddressUseCase(addressRepository);
  });
  describe('Validar input', () => {
    test('deve validar input do usuario corretamente', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '26349120',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(true);
    });

    test('deve retornar erro quando não tiver USER ID', () => {
      const input: CreateAddress = {
        user_id: undefined,
        cep: '26349120',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Id do usuário é obrigatório');
      }
    });

    test('deve retornar erro quando não definir um UF', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '26349120',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: undefined,
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Valor deve ser uma string');
      }
    });

    test('deve retornar erro quando definir um UF inválido', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '26349120',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: 'ur',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Deve conter um UF válido');
      }
    });

    test('deve retornar erro quando CEP for menor ou maior 8', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '1234567',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Cep deve conter 8 dígitos');
      }
    });

    test('deve retornar erro quando CEP não conter apenas dígitos', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '1234-cep',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Cep deve conter apenas números');
      }
    });

    test('deve retornar erro quando PUBLIC PLACE tiver mais de 200 caracteres', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: 'Rio de janeiro',
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: generateString(201),
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Não pode conter mais de 200 caracteres');
      }
    });

    test('deve retornar erro quando CITY não quando for digitado', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: undefined,
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Nome da cidade obrigatório');
      }
    });

    test('deve retornar erro quando CITY tiver menos que 1 caracter', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: '',
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Deve conter no mínimo 1 caracter');
      }
    });

    test('deve retornar erro quando CITY tiver mais de 50 caracteres', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: generateString(51),
        neighborhood: 'Da graça',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Não pode conter mais de 50 caracteres');
      }
    });

    test('deve retornar erro quando NEIGHBORHOOD não quando for digitado', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: 'Rio de Janeiro',
        neighborhood: undefined,
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Nome do bairro obrigatório');
      }
    });

    test('deve retornar erro quando NEIGHBORHOOD tiver menos que 1 caracter', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: 'Rio de Janeiro',
        neighborhood: '',
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Deve conter no mínimo 1 caracter');
      }
    });

    test('deve retornar erro quando NEIGHBORHOOD tiver mais de 50 caracteres', () => {
      const input: CreateAddress = {
        user_id: 1,
        cep: '12345678',
        city: 'Rio de Janeiro',
        neighborhood: generateString(51),
        uf: 'RJ',
        complement: '',
        public_place: '',
      };

      const result = createAddress.validateInput(input);
      expect(result.success).toBe(false);
      if (result.success === false) {
        expect(result.error).toBe('Não pode conter mais de 50 caracteres');
      }
    });
  });
});
