import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyEntity } from '../../classes/journey/journey.entity';
import { ReportEntity } from '../../classes/report/report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JourneyEntity]),
    TypeOrmModule.forFeature([ReportEntity]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
