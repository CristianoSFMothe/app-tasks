/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/swagger';
import { TasksEntity } from '../../../tasks/entities/tasks.entity';

export class UpdatedTasksSwagger extends OmitType(TasksEntity, [
  'id',
  'status',
  'createdAt',
  'updatedAt',
]) {}
