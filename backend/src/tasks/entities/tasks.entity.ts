/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusTasks } from '../../enun/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class TasksEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ 
    name: 'tasks', 
    type: 'varchar', 
    nullable: false })
  @ApiProperty({ 
    name: 'task' ,
    description: 'Tarefa',
    default: 'Ir ao mercado'
  })
  task: string;

  @Column({ 
    name: 'description', 
    type: 'varchar', 
    nullable: false })
  @ApiProperty({ 
    name: 'description',
    description: 'descrição',
    default: 'Fazer compras do mês'
   })
  description: string;

  @Column({ 
    default: StatusTasks.PENDING, 
    nullable: false })
  @ApiProperty({
    name: 'status',
    enum: StatusTasks,
    description: 'Status da tarefa',
  })
  status: StatusTasks;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiPropertyOptional({ 
    name: 'createdAt',
    description: 'Data de Criação' ,
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiPropertyOptional({ 
    name: 'updatedAt',
    description: 'Data de atualização',
    default: () => 'CURRENT_TIMESTAMP'
   })
  updatedAt: Date;
}
