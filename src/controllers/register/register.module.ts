import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyEntity } from '../../classes/journey/journey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JourneyEntity])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
