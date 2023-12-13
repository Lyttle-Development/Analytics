import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('int', { default: 0 })
  journeyRegistration: number;

  @CreateDateColumn()
  createdAt: Date;
}
