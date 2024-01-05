/* eslint-disable prettier/prettier */
import { StatusTasks } from '../../enun/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TasksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tasks', type: 'varchar', nullable: false })
  task: string;

  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @Column({ default: StatusTasks.PENDING, nullable: false })
  status: StatusTasks;
}
