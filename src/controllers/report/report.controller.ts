import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async report(
    @Res() res: Response,
    @Query('uuid') uuid: string,
    @Query('url') url: string,
    @Query('source') source: string,
  ) {
    await this.reportService.report(uuid, url, source);
    return res.redirect(url);
  }
}
