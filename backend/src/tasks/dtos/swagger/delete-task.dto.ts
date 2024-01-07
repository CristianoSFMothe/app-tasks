/* eslint-disable prettier/prettier */
import { OmitType, PartialType } from '@nestjs/swagger';
import { TasksEntity } from '../../../tasks/entities/tasks.entity';

export class DeleteTasksSwagger extends PartialType(
  OmitType(TasksEntity, [
    'description',
    'status',
    'createdAt',
    'updatedAt',
  ])
) {}
