/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDetailsDto {
  @IsString()
  @IsOptional()
  readonly task?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
