/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDetailsDto {
  @ApiPropertyOptional({ 
    name: 'task' ,
    description: 'Tarefa',
    default: 'Ir ao mercado'
  })
  @IsString()
  @IsOptional()
  readonly task: string;

  @ApiPropertyOptional({ 
    name: 'description',
    description: 'descrição',
    default: 'Fazer compras do mês'
  })
  @IsString()
  @IsOptional()
  readonly description: string;  
}
