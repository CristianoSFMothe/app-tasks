/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum StatusTasks {
  BACKLOG = 'BACKLOG',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEnum(StatusTasks)
  @IsNotEmpty()
  readonly status: StatusTasks;
}