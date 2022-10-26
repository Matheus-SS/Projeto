import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/useCases/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
