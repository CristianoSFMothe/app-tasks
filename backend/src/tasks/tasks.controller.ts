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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskStatusDto } from './dtos/update-status-task.dto';
import { GetAllTasksSwagger } from './dtos/swagger/get-all-task.dto';
import { CreateTasksSwagger } from './dtos/swagger/create-task.dto';
import { UpdatedTasksSwagger } from './dtos/swagger/updated-task.dto';
import { UpdatedStatusTasksSwagger } from './dtos/swagger/updated-status-task.dto';
import { DeleteTasksSwagger } from './dtos/swagger/delete-task.dto';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-foud.swagger';

@ApiTags('Lista de tarefas')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenha todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Devolva todas as tarefas',
    type: GetAllTasksSwagger,
    isArray: true,
  })
  async findAll(): Promise<any[]> {
    return await this.tasksService.findAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma tarefa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa retornada',
    type: GetAllTasksSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não foi encontrada',
    type: NotFoundSwagger
  })
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.tasksService.findOneTask(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    type: CreateTasksSwagger,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos',
    type: BadRequestSwagger
   })
  @ApiBody({
    description: 'Dados para informar para criação da tarefa',
    type: CreateTasksSwagger,
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<TasksEntity> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar o "task" e/ou "description" de uma tarefa',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: GetAllTasksSwagger,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos',
    type: BadRequestSwagger
   })
   @ApiResponse({ 
    status: 404, 
    description: 'Tarefa não foi encontrada',
    type: NotFoundSwagger
   })
  @ApiBody({
    description: 'Atualização da "task" e/ou "description" da tarefa',
    type: UpdatedTasksSwagger
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskDetailsDto: UpdateTaskDetailsDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDetailsDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar o status de uma tarefa' })
  @ApiOperation({
    summary: 'Atualizar o "task" e/ou "description" de uma tarefa',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: GetAllTasksSwagger,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos',
    type: BadRequestSwagger
   })
  @ApiResponse({ 
    status: 404, 
    description: 'Tarefa não foi encontrada',
    type: NotFoundSwagger
   })
  @ApiBody({
    description: 'Status da tarefa atualizado com sucesso',
    type: UpdatedStatusTasksSwagger
  })
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<UpdateTaskStatusDto> {
    return this.tasksService.updateStatus(id, updateTaskStatusDto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa removida com sucesso',
    type: DeleteTasksSwagger
   })
  @ApiResponse({ 
    status: 404, 
    description: 'Tarefa não foi encontrada',
    type: NotFoundSwagger
   })
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }
}
