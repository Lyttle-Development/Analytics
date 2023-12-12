import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as file from 'fs';
import { JourneyEntity } from '../../classes/journey/journey.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(JourneyEntity)
    private journeyRepository: Repository<JourneyEntity>,
  ) {}

  async register(server: string) {
    // Get the client script from the file system
    const clientScriptPath = path.join(__dirname, 'register.js');
    let clientScript = file.readFileSync(clientScriptPath, 'utf8');

    if (!clientScript) {
      throw new Error('Failed to read register.js file');
    }

    clientScript = clientScript.replace('%%ANALYTICS_URL%%', server);

    // Return the client script
    return clientScript;
  }

  async login(journeyId: string) {
    let journey: JourneyEntity = null;
    try {
      // Get the journey from the database
      journey = await this.journeyRepository.findOneBy({ id: journeyId });
    } catch (e) {}

    if (!journey) {
      const newJourney = new JourneyEntity();
      journey = await this.journeyRepository.save(newJourney);

      return journey.id;
    }

    // Check if the update time exceeds 20 minutes
    const now = new Date();
    const lastUpdate = journey.updatedAt;
    const diff = now.getTime() - lastUpdate.getTime();
    const diffMinutes = Math.floor(diff / 1000 / 60);
    if (diffMinutes > 20) {
      // Create new journey
      const newJourney = new JourneyEntity();
      newJourney.registrations = 0;
      await this.journeyRepository.save(newJourney);
      return this.login(journeyId);
    }

    journey.registrations++;
    await this.journeyRepository.save(journey);

    // Return the journey
    return journey.id;
  }
}
