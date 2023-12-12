import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './controllers/report/report.module';
import { RegisterModule } from './controllers/register/register.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        // 1. https://www.google.com/search?q=what+does+synchronize+do+nestjs
        // - synchronize: Indicates if database schema should be auto-created on every application launch
        //
        // 2. https://docs.nestjs.com/techniques/database#:~:text=WARNING,lose%20production%20data.
        // - Setting "synchronize: true" shouldn't be used in production - otherwise you can lose production data.
        synchronize: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
    }),
    ReportModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
