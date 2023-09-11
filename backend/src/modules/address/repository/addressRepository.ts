import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TYPEORM } from '@src/constants';
import {
  CreateAddress,
  IAddressRepository,
} from './addressRepository.interface';
import { Address } from '@infra/database/entity/Address.entity';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @Inject(DATABASE_TYPEORM)
    private database: TypeOrmDatabase,
  ) {}

  private get address() {
    return this.database.connection.getRepository(Address);
  }
  public async create(data: CreateAddress): Promise<void> {
    const address = this.address.create({
      user_id: data.user_id,
      cep: data.cep,
      public_place: data.public_place,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      uf: data.uf,
    });

    await this.address.insert(address);
  }
}
