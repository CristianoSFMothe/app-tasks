/* eslint-disable prettier/prettier */
import {  IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

}