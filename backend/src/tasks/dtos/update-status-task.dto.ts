/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusTasks } from '../../enun/status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(StatusTasks)
  @IsNotEmpty()
  readonly status: StatusTasks;
}
