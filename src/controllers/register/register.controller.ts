import { Controller, Get, Query } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get()
  login(@Query('journeyId') journeyId: string) {
    return this.registerService.login(journeyId);
  }

  @Get('script')
  register(@Query('server') server: string) {
    return this.registerService.register(server);
  }
}
