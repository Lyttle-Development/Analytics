import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report')
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  journeyId: string;

  @Column('text', { nullable: true })
  url: string;

  @Column('text', { nullable: true })
  source: string;
}
