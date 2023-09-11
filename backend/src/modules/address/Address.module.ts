import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateAddressUseCase } from './useCases/createAddress/createAddressUseCase';
import { AddressController } from './Address.controller';
import { AddressRepositoryModule } from './repository/addressRepository.module';

@Module({
  imports: [DatabaseModule, AddressRepositoryModule],
  providers: [CreateAddressUseCase],
  controllers: [AddressController],
})
export class AddressModule {}
