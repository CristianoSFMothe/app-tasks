/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ name: 'Task' })
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @ApiProperty({ name: 'Description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;  
}