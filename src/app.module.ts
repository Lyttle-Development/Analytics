import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [ReportModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
