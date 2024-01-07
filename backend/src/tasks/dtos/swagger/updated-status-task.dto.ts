/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/swagger';
import { TasksEntity } from 'src/tasks/entities/tasks.entity';

export class UpdatedStatusTasksSwagger extends OmitType(TasksEntity, [
  'id',
  'task',
  'description',
  'createdAt',
  'updatedAt',
]) {}
