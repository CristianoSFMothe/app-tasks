/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDetailsDto {
  @IsString()
  @IsNotEmpty()
  readonly task?: string;

  @IsString()
  @IsNotEmpty()
  readonly description?: string;
}
