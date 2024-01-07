/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusTasks } from '../../enun/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    name: 'status',
    enum: StatusTasks,
    description: 'Status da tarefa',
    default: StatusTasks.PENDING
  })
  @IsEnum(StatusTasks)
  @IsNotEmpty()
  readonly status: StatusTasks;
}
