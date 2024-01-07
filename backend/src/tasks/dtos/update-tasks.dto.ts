/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDetailsDto {
  @ApiPropertyOptional({ name: 'Task' })
  @IsString()
  @IsOptional()
  readonly task?: string;

  @ApiPropertyOptional({ name: 'Description' })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
