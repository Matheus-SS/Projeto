import TypeOrmDatabase from '@infra/database/typeormDatabase';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE } from '@src/constants';
import {
  CreateAddress,
  IAddressAll,
  IAddressRepository,
} from './addressRepository.interface';
import { Address } from '@infra/database/entity/Address.entity';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @Inject(DATABASE)
    private database: TypeOrmDatabase,
  ) {}

  private get address() {
    return this.database.connection.getRepository(Address);
  }
  public async create(data: CreateAddress): Promise<number> {
    const address = this.address.create({
      user_id: data.user_id,
      cep: data.cep,
      public_place: data.public_place,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      uf: data.uf,
    });

    const result = await this.address.insert(address);
    return result.identifiers[0].id;
  }

  public async findById(id: number): Promise<IAddressAll[]> {
    return await this.address.query(
      `
      select
        A.id,
        A.user_id,
        A.cep,
        A.public_place,
        A.complement,
        A.neighborhood,
        A.city,
        A.uf,
        A.created_at,
        A.updated_at,
        B.username as user_username,
        B.email as user_email,
        B.created_at as user_created_at,
        B.updated_at as user_updated_at
      from
        tbl_address A
      join tbl_user B 
      on
        A.user_id = B.id
      where
        A.id = $1;
    `,
      [id],
    );
  }

  public async findByUserId(user_id: number): Promise<IAddressAll[]> {
    return await this.address.query(
      `
      select
        A.id,
        A.user_id,
        A.cep,
        A.public_place,
        A.complement,
        A.neighborhood,
        A.city,
        A.uf,
        A.created_at,
        A.updated_at,
        B.username as user_username,
        B.email as user_email,
        B.created_at as user_created_at,
        B.updated_at as user_updated_at
      from
        tbl_address A
      join tbl_user B 
      on
        A.user_id = B.id
      where
        A.user_id = $1;
    `,
      [user_id],
    );
  }
  public async delete(id: number, user_id: number): Promise<void> {
    await this.address.delete({ id: id, user_id: user_id });
  }
}
