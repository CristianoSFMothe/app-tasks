/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusTasks } from '../../enun/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    name: 'Status',
    enum: StatusTasks,
    description: 'Status of the task',
  })
  @IsEnum(StatusTasks)
  @IsNotEmpty()
  readonly status: StatusTasks;
}
