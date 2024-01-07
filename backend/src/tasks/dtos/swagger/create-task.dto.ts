/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/swagger';
import { TasksEntity } from '../../../tasks/entities/tasks.entity';

export class CreateTasksSwagger extends OmitType(TasksEntity, [
  'id',
  'status',
  'createdAt',
  'updatedAt',
]) {}
