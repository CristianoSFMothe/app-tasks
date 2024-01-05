import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return 'Listagem da tarefas';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Tarefa ${id}`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    console.log('body', body);

    return `Tarefa ${id} atualizada`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Tarefa ${id} removida`;
  }
}
