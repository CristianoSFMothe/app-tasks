/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { StatusTasks } from '../../enun/status.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
  
  readonly status?: StatusTasks;
}