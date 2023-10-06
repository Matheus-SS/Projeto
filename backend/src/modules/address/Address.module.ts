import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateAddressUseCase } from './useCases/createAddress/createAddressUseCase';
import { AddressController } from './Address.controller';
import { AddressRepositoryModule } from './repository/addressRepository.module';
import { ListAddressByUserIdUseCase } from './useCases/listAddressByUserId/listAddressByUserIdUseCase';
import { DeleteAddressUseCase } from './useCases/deleteAddress/deleteAddressUseCase';

@Module({
  imports: [DatabaseModule, AddressRepositoryModule],
  providers: [
    CreateAddressUseCase,
    ListAddressByUserIdUseCase,
    DeleteAddressUseCase,
  ],
  controllers: [AddressController],
})
export class AddressModule {}
