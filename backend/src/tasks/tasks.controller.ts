/* eslint-disable prettier/prettier */
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
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { TasksEntity } from './entities/tasks.entity';
import { UpdateTaskDetailsDto } from './dtos/update-tasks.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskStatusDto } from './dtos/update-status-task.dto';

@ApiTags('Lista de tarefas')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenha todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Devolva todas as tarefas' })
  async findAll(): Promise<any[]> {
    return await this.tasksService.findAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma tarefa por ID' })  
  @ApiResponse({ status: 404, description: 'Tarefa não foi encontrada' })
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.tasksService.findOneTask(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar o "task" e/ou "descrioption" de uma tarefa',
  })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não foi encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDetailsDto: UpdateTaskDetailsDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDetailsDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar o status de uma tarefa' })
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<UpdateTaskStatusDto> {
    return this.tasksService.updateStatus(id, updateTaskStatusDto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não foi encontrada' })
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }
}
