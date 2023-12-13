import { Injectable } from '@nestjs/common';
import { JourneyEntity } from '../../classes/journey/journey.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from '../../classes/report/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(JourneyEntity)
    private journeyRepository: Repository<JourneyEntity>,
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {}

  async report(uuid: string, url: string, source: string) {
    try {
      const journey: JourneyEntity = await this.journeyRepository.findOneBy({
        id: uuid,
      });

      if (!journey) {
        throw new Error('Journey not found');
      }

      // Check if the update time exceeds 20 minutes
      const now = new Date();
      const lastUpdate = journey.updatedAt;
      const diff = now.getTime() - lastUpdate.getTime();
      const diffMinutes = Math.floor(diff / 1000 / 60);
      if (diffMinutes > 20) {
        // Create new journey
        const newJourney = new JourneyEntity();
        newJourney.registrations = 1;
        await this.journeyRepository.save(newJourney);
        return this.report(uuid, url, source);
      }

      // Update the journey
      journey.registrations++;
      await this.journeyRepository.save(journey);

      const report = new ReportEntity();
      report.journeyId = uuid;
      report.url = url;
      report.source = source;
      report.journeyRegistration = journey.registrations;
      await this.reportRepository.save(report);
    } catch (e) {}
  }
}
