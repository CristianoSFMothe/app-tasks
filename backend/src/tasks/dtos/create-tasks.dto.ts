/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusTasks } from 'src/enun/status.enum';

export class CreateTaskDto {
  @ApiProperty({ 
    name: 'task' ,
    description: 'Tarefa',
    default: 'Ir ao mercado'
  })
  @IsString()
  @IsNotEmpty()
  readonly task: string;

  @ApiProperty({ 
    name: 'description',
    description: 'descrição',
    default: 'Fazer compras do mês'
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;  

  @ApiPropertyOptional({
    name: 'Status',
    enum: StatusTasks,
    description: 'Status da tarefa',
    default: StatusTasks.PENDING
  })
  @IsEnum(StatusTasks)
  @IsOptional()
  readonly status?: StatusTasks;
}